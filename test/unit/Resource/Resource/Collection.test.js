import Collection from '../../../../src/Resource/Resource/Collection';

describe('The collection', () => {
  const mockResponse = {
    paging: {
      pages: 5,
      count: 100,
    },
    data: [
      { id: '1', type: 'products', data: { title: 'Product 1' } },
      { id: '2', type: 'products', data: { title: 'Product 2' } },
    ],
  };

  const repositoryFindMock = jest.fn(() => Promise.resolve(mockResponse));

  const productRepository = {
    find: repositoryFindMock,
  };

  const collection = new Collection('product', productRepository);

  test('that the collection is initialized correctly', () => {
    expect(collection.name).toEqual('product');
    expect(collection.repository).toBe(productRepository);
    expect(collection.length).toBe(0);
    expect(collection.isLoading).toBeFalsy();
    expect(collection.isLoaded).toBeFalsy();
    expect(collection.items).toHaveLength(0);
  });

  test('that the collection correctly uses the repository to find items',
    () => collection.load().then(() => {
      expect(collection.length).toEqual(100);
      expect(collection.pages).toEqual(5);
      expect(collection.items).toHaveLength(2);
      expect(collection.isLoading).toBeFalsy();
      expect(collection.isLoaded).toBeTruthy();
    }));

  test('that the repository find is not called if the data has been loaded and the state has not changed',
    () => collection.load().then(() => {
      expect(productRepository.find.mock.calls).toHaveLength(1);

      expect(collection.length).toEqual(100);
      expect(collection.pages).toEqual(5);
      expect(collection.items).toHaveLength(2);
      expect(collection.isLoading).toBeFalsy();
      expect(collection.isLoaded).toBeTruthy();

      collection.load().then(() => {
        expect(productRepository.find.mock.calls).toHaveLength(1);

        expect(collection.length).toEqual(100);
        expect(collection.pages).toEqual(5);
        expect(collection.items).toHaveLength(2);
        expect(collection.isLoading).toBeFalsy();
        expect(collection.isLoaded).toBeTruthy();
      });
    }));
});
