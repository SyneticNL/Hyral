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
      loadResource: collectionMixin.methods.loadResource,
      collection: mockCollection,
    }, collectionMixin);

    mixin.serverPrefetch.call(mixin);
    expect(mockCollection.load).toHaveBeenCalled();

    mockCollection.load.mockClear();

    mixin.mounted.call(mixin);
    expect(mockCollection.load).toHaveBeenCalled();
  });

  test('that the mixin handles errors on serverPrefetch', () => {
    const mixin = Object.assign({
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection.create('products')),
        },
      },
    }, collectionMixin);

    return mixin.serverPrefetch.call(mixin).catch(() => {
      expect(mixin.$store.getters['hyral_product/collection']).not.toHaveBeenCalled();
    });
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