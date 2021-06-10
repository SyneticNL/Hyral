// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import { Resource, ParameterBag } from '@hyral/core';
import resourceMixin from '../../src/Mixin/Resource';

describe('The Resource mixin', () => {
  test('that a resource is available as a computed property', () => {
    const data = { test: 'test' };
    const mixin = {
      source: new Resource(1, 'product'),
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => () => new Resource(1, 'product', data)),
        },
      },
      ...resourceMixin,
    };

    const resource = mixin.computed.resource?.call(mixin as any);

    expect(resource).toHaveProperty('id');
    expect(resource?.id).toEqual(1);
    expect(resource?.data).toEqual(data);
  });

  test('that the mixin returns a computed property if resource data is available', () => {
    const data = { test: 'test' };
    const mixin = {
      source: new Resource(1, 'product', data),
      hyralService: 'service',
      ...resourceMixin,
    };

    const resource = mixin.computed.resource?.call(mixin as any);

    expect(resource).toHaveProperty('id');
    expect(resource?.id).toEqual(1);
    expect(resource?.data).toEqual(data);
  });

  test('that the mixin returns \'null\' without source', () => {
    const mixin = {
      hyralService: 'service',
      ...resourceMixin,
    };

    const resource = mixin.computed.resource?.call(mixin as any);

    expect(resource).toEqual(null);
  });

  test('that the mixin handles no source on serverPrefetch', async () => {
    const mixin = {
      $store: {
        dispatch: jest.fn(),
      },
      loadResource: resourceMixin.methods.loadResource,
      ...resourceMixin,
    };

    expect.assertions(1);
    await mixin.mounted.call(mixin as any);
    expect(mixin.$store.dispatch).not.toHaveBeenCalled();
  });

  test('that the mixin handles no source on mounted', async () => {
    const mixin = {
      $store: {
        dispatch: jest.fn(),
      },
      loadResource: resourceMixin.methods.loadResource,
      ...resourceMixin,
    };

    expect.assertions(1);
    await mixin.serverPrefetch.call(mixin as any);
    expect(mixin.$store.dispatch).not.toHaveBeenCalled();
  });

  test('that the mixin does not load available resources', () => {
    const product = new Resource(1, 'product', { data: { test: '' } });
    const mixin = {
      source: product,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/resource': jest.fn(() => () => product),
        },
        dispatch: jest.fn(),
      },
      loadResource: resourceMixin.methods.loadResource,
      ...resourceMixin,
    };

    expect(mixin.loadResource.call(mixin as any)).toEqual(Promise.resolve());
  });

  test('that a resource will be loaded on initialization of the component', async () => {
    const product = new Resource('1', 'product');
    const object = { id: '1', type: 'product' };
    const mixin = {
      source: product,
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

    await mixin.serverPrefetch.call(mixin as any);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);

    mixin.$store.dispatch.mockClear();

    await mixin.mounted.call(mixin as any);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);
  });

  test('that a resource with a parameter bag will be loaded on initialization of the component', async () => {
    const parameterBag = new ParameterBag();
    parameterBag.addParam('include', 'relation1');
    const product = new Resource('2', 'product');
    const object = { id: '2', type: 'product', parameterBag };

    const mixin = {
      source: product,
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

    await mixin.serverPrefetch.call(mixin as any);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);

    mixin.$store.dispatch.mockClear();

    await mixin.mounted.call(mixin as any);
    expect(mixin.$store.dispatch).toHaveBeenCalledWith('hyral_service/LOAD_RESOURCE', object);
  });
});
