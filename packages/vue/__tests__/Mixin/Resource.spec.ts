// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import { Resource, ParameterBag } from '@hyral/core';
import resourceMixin from '../../src/Mixin/Resource';

describe('The Resource mixin', () => {
  test('that a resource is available as a computed property', () => {
    const mixin = {
      resourceType: 'product',
      id: '1',
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => () => new Resource(1, 'product', {})),
        },
      },
      ...resourceMixin,
    };

    const resource = mixin.computed.resource.call(mixin);

    expect(resource).toHaveProperty('id');
    expect(resource.id).toEqual(1);
  });

  test('that the mixin handles errors on serverPrefetch', () => {
    const mixin = {
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => () => new Resource(1, 'product', {})),
        },
      },
      ...resourceMixin,
    };

    expect.assertions(1);
    return mixin.serverPrefetch.call(mixin).catch(() => {
      expect(mixin.$store.getters['hyral_service/resource']).not.toHaveBeenCalled();
    });
  });

  test('that the mixin does not load available resources during serverPrefetch', async () => {
    const product = new Resource(1, 'product', {});
    const mixin = {
      resourceType: 'product',
      id: '2',
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => () => product),
        },
        dispatch: jest.fn(),
      },
      loadResource: jest.fn(),
      ...resourceMixin,
    };

    await mixin.serverPrefetch.call(mixin);
    expect(mixin.loadResource).not.toHaveBeenCalled();
  });

  test('that the mixin handles errors on mounted', async () => {
    const mixin = {
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => new Resource(1, 'product', {})),
        },
      },
      ...resourceMixin,
    };

    await mixin.mounted.call(mixin);

    expect(mixin.$store.getters['hyral_service/resource']).not.toHaveBeenCalled();
  });

  test('that a resource will be loaded on initialization of the component', async () => {
    const mixin = {
      resourceType: 'product',
      id: '1',
      hyralService: 'service',
      $store: {
        dispatch: jest.fn(),
        getters: {
          'hyral_service/resource': jest.fn(() => () => null),
        },
      },
      loadResource: resourceMixin.methods.loadResource,
      ...resourceMixin,
    };

    await mixin.serverPrefetch.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', { id: '1', resourceType: 'product' });

    mixin.$store.dispatch.mockClear();

    await mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', { id: '1', resourceType: 'product' });
  });

  test('that a resource with a parameter bag will be loaded on initialization of the component', async () => {
    const parameterBag = new ParameterBag();
    parameterBag.addParam('include', 'relation1');

    const mixin = {
      resourceType: 'product',
      id: '2',
      hyralService: 'service',
      $store: {
        dispatch: jest.fn(),
        getters: {
          'hyral_service/resource': jest.fn(() => () => null),
        },
      },
      parameterBag,
      loadResource: resourceMixin.methods.loadResource,
      ...resourceMixin,
    };

    await mixin.serverPrefetch.call(mixin);
    const object = { id: '2', resourceType: 'product', parameterBag };
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);

    mixin.$store.dispatch.mockClear();

    await mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);
  });
});
