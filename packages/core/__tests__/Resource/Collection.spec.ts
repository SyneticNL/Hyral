import Collection from '../../src/Resource/Collection';
import Resource from '../../src/Resource/Resource';

describe('Collection tests', () => {
  const type = 'product';
  const name = type;
  const mockResponse = {
    data: [
      new Resource<any>('1', type, { title: 'Product 1' }),
      new Resource<any>('2', type, { title: 'Product 2' }),
    ],
  };

  const productRepository = {
    find: jest.fn(() => Promise.resolve(mockResponse.data)),
  };

  test('that the collection is initialized correctly', () => {
    const collection = new Collection(name, type, productRepository as any);

    expect(collection.name).toEqual('product');
    expect(collection.repository).toBe(productRepository);
    expect(collection.length).toBe(0);
    expect(collection.items).toHaveLength(0);
    expect(collection.data).toHaveLength(0);
  });

  test('that the collectionn can be initialized with a parameterbag', () => {
    const parameterbag = {};
    const collection = new Collection(name, type, productRepository as any, parameterbag as any);

    expect(collection.name).toEqual('product');
    expect(collection.parameterBag).toEqual({});
    expect(collection.repository).toBe(productRepository);
    expect(collection.length).toBe(0);
    expect(collection.items).toHaveLength(0);
    expect(collection.data).toHaveLength(0);
  });

  test('that the collection correctly uses the repository to find items', async () => {
    const collection = new Collection(name, type, productRepository as any);

    await collection.load();
    expect(productRepository.find.mock.calls).toHaveLength(1);
    expect(collection.length).toEqual(2);
    expect(collection.items).toHaveLength(2);
    expect(collection.data).toHaveLength(2);
  });

  test('that the collection load throws an error without any repository', () => {
    const collection = new Collection(name, type);

    expect.assertions(1);
    collection.load().catch((err: Error) => {
      expect(err.message).toEqual('No repository was present in collection product');
    });
  });
});
