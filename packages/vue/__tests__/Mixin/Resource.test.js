import Resource from '../../../core/src/Resource/Resource';
import resourceMixin from '../../src/Mixin/Resource';
import ParameterBag from '@hyral/core/src/Resource/ParameterBag';

describe('The Resource mixin', () => {
  test('that a resource is available as a computed property', () => {
    const mixin = Object.assign({
      resourceType: 'product',
      id: '1',
      $store: {
        getters: {
          'hyral_product/resource': jest.fn(() => Resource.create(1, 'product', {})),
        },
      },
    }, resourceMixin);

    const resource = mixin.computed.resource.call(mixin);

    expect(resource).toHaveProperty('id');
    expect(resource.id).toEqual(1);
  });

  test('that the mixin handles errors on serverPrefetch', () => {
    const mixin = Object.assign({
      $store: {
        getters: {
          'hyral_product/resource': jest.fn(() => Resource.create(1, 'product', {})),
        },
      },
    }, resourceMixin);

    expect.assertions(1);
    return mixin.serverPrefetch.call(mixin).catch(() => {
      expect(mixin.$store.getters['hyral_product/resource']).not.toHaveBeenCalled();
    });
  });

  test('that the mixin handles errors on mounted', () => {
    const mixin = Object.assign({
      $store: {
        getters: {
          'hyral_product/resource': jest.fn(() => Resource.create(1, 'product', {})),
        },
      },
    }, resourceMixin);

    mixin.mounted.call(mixin);

    expect(mixin.$store.getters['hyral_product/resource']).not.toHaveBeenCalled();
  });

  test('that a resource will be loaded on initialization of the component', () => {
    const mixin = Object.assign({
      resourceType: 'product',
      id: '1',
      $store: {
        dispatch: jest.fn(),
      },
      loadResource: resourceMixin.methods.loadResource,
    }, resourceMixin);

    mixin.serverPrefetch.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '1', null);

    mixin.$store.dispatch.mockClear();

    mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '1', null);
  });

  test('that a resource with a parameter bag will be loaded on initialization of the component', () => {
    const parameterBag = ParameterBag();
    parameterBag.addParam('include', 'relation1');

    const mixin = Object.assign({
      resourceType: 'product',
      id: '2',
      $store: {
        dispatch: jest.fn(),
      },
      parameterBag,
      loadResource: resourceMixin.methods.loadResource,
    }, resourceMixin);

    mixin.serverPrefetch.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '2', parameterBag);

    mixin.$store.dispatch.mockClear();

    mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '2', parameterBag);
  });
});
