// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import { ParameterBag, Collection } from '@hyral/core';
import collectionMixin from '../../src/Mixin/Collection';

describe('The Collection mixin', () => {
  test('that a collection is available as a computed property with a default parameterBag', () => {
    const mockRepository: any = {};
    const mixin = {
      resourceType: 'product',
      collectionName: 'products',
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      ...collectionMixin,
    };

    const collection = mixin.computed.collection.call(mixin) as Collection<unknown>;
    expect(collection).toHaveProperty('name');
    expect(collection.name).toEqual('products');

    expect(collection.parameterBag).not.toBeNull();
  });

  test('that the collection is initialized with the provided parameterBag', () => {
    const mockRepository: any = {};
    const parameterBag = new ParameterBag();
    parameterBag.setParams({ test: 'value' });
    const mixin = {
      resourceType: 'product',
      collectionName: 'products',
      hyralService: 'service',
      parameterBag,
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      ...collectionMixin,
    };

    const collection = mixin.computed.collection.call(mixin) as Collection<unknown>;

    expect(collection).toHaveProperty('name');
    expect(collection.parameterBag.params).toEqual(parameterBag.params);
  });

  test('that a collection will be loaded on initialization of the component', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const mixin = {
      resourceType: 'product',
      collectionName: 'products',
      hyralService: 'service',
      $store: {
        commit: jest.fn(),
        getters: {
          'hyral_service/collection': jest.fn(() => () => null),
        },
        dispatch: jest.fn(),
      },
      initCollection: collectionMixin.methods.initCollection,
      loadCollection: collectionMixin.methods.loadCollection,
      collection: mockCollection,
      ...collectionMixin,
    };
    await mixin.serverPrefetch.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalled();

    mixin.$store.dispatch.mockClear();

    await mixin.mounted.call(mixin);
    expect(mixin.$store.dispatch).toHaveBeenCalled();

    mixin.created.call(mixin);
    expect(mixin.$store.commit).toHaveBeenCalled();
  });

  test('that the mixin handles errors on serverPrefetch', () => {
    const mockRepository: any = {};
    const mixin = {
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      hyralService: 'service',
      ...collectionMixin,
    };

    expect.assertions(1);
    return mixin.serverPrefetch.call(mixin).catch(() => {
      expect(mixin.$store.getters['hyral_service/collection']).not.toHaveBeenCalled();
    });
  });

  test('that the initCollection correctly initializes the store', () => {
    const state: { collections: { products: unknown } } = {
      collections: { products: undefined },
    };
    const mixin = {
      resourceType: 'product',
      collectionName: 'products',
      hyralService: 'service',
      $store: {
        commit: jest.fn((s, collection) => { state.collections.products = collection; }),
        getters: {
          'hyral_service/collection': jest.fn(() => () => state.collections.products || null),
        },
      },
      initCollection: collectionMixin.methods.initCollection,
      ...collectionMixin,
    };

    mixin.initCollection();
    expect(mixin.$store.commit).toHaveBeenCalledTimes(1);

    mixin.initCollection();
    expect(mixin.$store.commit).toHaveBeenCalledTimes(1);
  });

  test('that the mixin handles errors on mounted', async () => {
    const mockRepository: any = {};
    const mixin = {
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection('products', mockRepository)),
        },
      },
      ...collectionMixin,
    };

    await mixin.mounted.call(mixin);

    expect(mixin.$store.getters['hyral_service/collection']).not.toHaveBeenCalled();
  });

  test('that the mixin doesn\'t initialize if the component does not define the collectionName or resourceType', async () => {
    const mixin = {
      initCollection: jest.fn(),
      loadCollection: jest.fn(),
      ...collectionMixin,
    };

    mixin.serverPrefetch().catch(() => {});
    expect(mixin.initCollection).not.toHaveBeenCalled();
    expect(mixin.loadCollection).not.toHaveBeenCalled();

    await mixin.mounted();
    expect(mixin.initCollection).not.toHaveBeenCalled();
    expect(mixin.loadCollection).not.toHaveBeenCalled();

    mixin.created();
    expect(mixin.initCollection).not.toHaveBeenCalled();
    expect(mixin.loadCollection).not.toHaveBeenCalled();
  });

  test('that the collection getter can handle not being initialized yet', () => {
    const mixin = {
      resourceType: 'product',
      collectionName: 'products',
      hyralService: 'service',
      parameterBag: jest.fn(() => {}),
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => null),
        },
      },
      ...collectionMixin,
    };

    expect(mixin.computed.collection.call(mixin)).toBeNull();
  });
});
