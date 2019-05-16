import Resource from '../../../core/src/Resource/Resource';
import resourceMixin from '../../src/Mixin/Resource';

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
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '1');

    mixin.$store.dispatch.mockClear();

    mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_product/LOAD_RESOURCE', '1');
  });
});
