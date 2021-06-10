// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import { ParameterBag, Collection } from '@hyral/core';
import collectionMixin from '../../src/Mixin/Collection';

describe('The Collection mixin', () => {
  test('that a collection is available as a computed property with a default parameterBag', () => {
    const mockRepository: any = {};
    const source = { name: 'products', type: 'products' };
    const mixin = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      ...collectionMixin,
    };

    const collection = mixin.computed.collection.call(mixin as any) as Collection<unknown>;
    expect(collection).toHaveProperty('name');
    expect(collection.name).toEqual('products');

    expect(collection.parameterBag).not.toBeNull();
  });

  test('that the collection is initialized with the provided parameterBag', () => {
    const mockRepository: any = {};
    const parameterBag = new ParameterBag();
    parameterBag.setParams({ test: 'value' });
    const source = { name: 'products', type: 'products', parameterBag };
    const mixin = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      ...collectionMixin,
    };

    const collection = mixin.computed.collection.call(mixin as any) as Collection<unknown>;

    expect(collection).toHaveProperty('name');
    expect(collection.parameterBag.params).toEqual(parameterBag.params);
  });

  test('that a collection will be loaded on initialization of the component', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const mixin = {
      source: { parameterBag: {} },
      hyralService: 'service',
      $store: {
        commit: jest.fn(),
        getters: {
          'hyral_service/collection': () => () => mockCollection,
        },
      },
      loadCollection: collectionMixin.methods.loadCollection,
      collection: mockCollection,
      ...collectionMixin,
    };
    await mixin.serverPrefetch.call(mixin as any);
    expect(mockCollection.load).toHaveBeenCalled();
    expect(mixin.$store.commit).toHaveBeenCalled();

    mockCollection.load.mockClear();

    await mixin.mounted.call(mixin as any);
    expect(mockCollection.load).toHaveBeenCalled();
    expect(mixin.$store.commit).toHaveBeenCalled();
  });

  test('that the mixin handles no source on serverPrefetch', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const mixin = {
      collection: null,
      hyralService: 'service',
      loadCollection: collectionMixin.methods.loadCollection,
      ...collectionMixin,
    };

    expect.assertions(1);
    await mixin.serverPrefetch.call(mixin as any);
    expect(mockCollection.load).not.toHaveBeenCalled();
  });

  test('that the mixin handles no source on mounted', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const mixin = {
      collection: null,
      hyralService: 'service',
      loadCollection: collectionMixin.methods.loadCollection,
      ...collectionMixin,
    };

    expect.assertions(1);
    await mixin.mounted.call(mixin as any);
    expect(mockCollection.load).not.toHaveBeenCalled();
  });

  test('that the mixin doesn\'t load if the component does not define the name, type and parameterBag', async () => {
    const mixin = {
      initCollection: jest.fn(),
      loadCollection: collectionMixin.methods.loadCollection,
      collection: { load: jest.fn() },
      ...collectionMixin,
    };

    mixin.created.call(mixin as any);
    expect(mixin.initCollection).toHaveBeenCalled();

    await mixin.serverPrefetch.call(mixin as any);
    expect(mixin.collection.load).not.toHaveBeenCalled();

    mixin.collection.load.mockClear();

    await mixin.mounted.call(mixin as any);
    expect(mixin.collection.load).not.toHaveBeenCalled();
  });

  test('that the collection getter can handle not being initialized yet', () => {
    const source = { name: 'product', type: 'product' };
    const mixin = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => null),
        },
      },
      ...collectionMixin,
    };

    expect(mixin.computed.collection.call(mixin as any)).toBeNull();
  });
});
