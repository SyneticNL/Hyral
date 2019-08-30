import ParameterBag from '@hyral/core/src/Resource/ParameterBag';
import Collection from '../../../core/src/Resource/Collection';
import collectionMixin from '../../src/Mixin/Collection';

describe('The Collection mixin', () => {
  test('that a collection is available as a computed property with a default parameterBag', () => {
    const mixin = Object.assign({
      resourceType: 'product',
      collectionName: 'products',
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection.create('products')),
        },
      },
    }, collectionMixin);

    const collection = mixin.computed.collection.call(mixin);

    expect(collection).toHaveProperty('name');
    expect(collection.name).toEqual('products');

    expect(collection.parameterBag).not.toBeNull();
  });

  test('that the collection is initialized with the provided parameterBag', () => {
    const parameterBag = ParameterBag();
    parameterBag.setParams({ test: 'value' });

    const mixin = Object.assign({
      resourceType: 'product',
      collectionName: 'products',
      parameterBag,
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection.create('products')),
        },
      },
    }, collectionMixin);

    const collection = mixin.computed.collection.call(mixin);

    expect(collection).toHaveProperty('name');
    expect(collection.parameterBag.params).toEqual(parameterBag.params);
  });

  test('that a collection will be loaded on initialization of the component', () => {
    const mockCollection = {
      load: jest.fn(),
    };

    const mixin = Object.assign({
      resourceType: 'product',
      collectionName: 'products',
      $store: {
        commit: jest.fn(),
      },
      initCollection: collectionMixin.methods.initCollection,
      loadCollection: collectionMixin.methods.loadCollection,
      collection: mockCollection,
    }, collectionMixin);

    mixin.serverPrefetch.call(mixin);
    expect(mockCollection.load).toHaveBeenCalled();

    mockCollection.load.mockClear();

    mixin.mounted.call(mixin);
    expect(mockCollection.load).toHaveBeenCalled();

    mixin.created.call(mixin);
    expect(mixin.$store.commit).toHaveBeenCalled();
  });

  test('that the mixin handles errors on serverPrefetch', () => {
    const mixin = Object.assign({
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection.create('products')),
        },
      },
    }, collectionMixin);

    expect.assertions(1);
    return mixin.serverPrefetch.call(mixin).catch(() => {
      expect(mixin.$store.getters['hyral_product/collection']).not.toHaveBeenCalled();
    });
  });

  test('that the initCollection correctly initializes the store', () => {
    const state = {
      collections: {},
    };
    const mixin = Object.assign({
      resourceType: 'product',
      collectionName: 'products',
      $store: {
        commit: jest.fn((s, collection) => { state.collections.products = collection }),
        getters: {
          'hyral_product/collection': jest.fn(() => state.collections.products || null),
        },
      },
      initCollection: collectionMixin.methods.initCollection,
    }, collectionMixin);

    mixin.initCollection();

    expect(mixin.$store.commit).toHaveBeenCalledTimes(1);

    mixin.initCollection();

    expect(mixin.$store.commit).toHaveBeenCalledTimes(1);
  });

  test('that the mixin handles errors on mounted', () => {
    const mixin = Object.assign({
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection.create('products')),
        },
      },
    }, collectionMixin);

    mixin.mounted.call(mixin);

    expect(mixin.$store.getters['hyral_product/collection']).not.toHaveBeenCalled();
  });
});
