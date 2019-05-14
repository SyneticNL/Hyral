import Collection from '../../../core/src/Resource/Collection';
import collectionMixin from '../../src/Mixin/Collection';

describe('The Collection mixin', () => {
  test('that a collection is available as a computed property', () => {
    const mixin = Object.assign({
      resourceType: 'product',
      collectionName: 'products',
      $store: {
        getters: {
          'hyral_product/collection': jest.fn(() => Collection('products')),
        },
      },
    }, collectionMixin);

    const collection = mixin.computed.collection.call(mixin);

    expect(collection).toHaveProperty('name');
    expect(collection.name).toEqual('products');
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
});
