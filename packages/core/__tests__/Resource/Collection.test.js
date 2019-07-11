import Collection from '../../src/Resource/Collection';
import { setState } from '../../src/State/State';

describe('Collection tests', () => {
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

  const collection = Collection.create('product', productRepository);

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

      return collection.load().then(() => {
        expect(productRepository.find.mock.calls).toHaveLength(1);

        expect(collection.length).toEqual(100);
        expect(collection.pages).toEqual(5);
        expect(collection.items).toHaveLength(2);
        expect(collection.isLoading).toBeFalsy();
        expect(collection.isLoaded).toBeTruthy();
      });
    }));
  test('that the collection state can be retrieved using the state getter and is well formed.', () => {
    expect(collection.name).toEqual('product');
    expect(collection.state).toHaveProperty('data');
    expect(collection.state.data).toHaveProperty('items');
    expect(collection.state).toHaveProperty('metadata');
    expect(collection.state).toHaveProperty('parameterBag');
    expect(collection.state.metadata).toHaveProperty('loading');
    expect(collection.state.metadata).toHaveProperty('loaded');
    expect(collection.state.metadata).toHaveProperty('lastParameterBagState');
    expect(collection.state.metadata).toHaveProperty('paging');
  });

  const state = {
    data: {
      items: [
        {
          id: 1,
          title: 'title',
        },
      ],
    },
    metadata: {
      loading: false,
      loaded: true,
      parameterBag: null,
      lastParameterBagState: null,
      paging: {
        count: 10,
        pages: 1,
      },
    },
  };
  test('that the collection state can be set from data', () => {
    const newCollection = Collection.create('test', productRepository);
    setState(newCollection.stateStack, state);

    expect(newCollection.name).toEqual('test');
    expect(newCollection.items).toEqual(state.data.items);
    expect(newCollection.isLoaded).toBeTruthy();
    expect(newCollection.isLoading).toBeFalsy();
    expect(newCollection.pages).toEqual(state.metadata.paging.pages);
    expect(newCollection.length).toEqual(state.metadata.paging.count);
  });

  test('that a new collection can be made based on state and repository', () => {
    const newCollection = Collection.fromState('test', state, productRepository);
    expect(newCollection.repository).toBe(productRepository);
    expect(newCollection.items).toEqual(state.data.items);
    expect(newCollection.isLoaded).toEqual(state.metadata.loaded);
  });

  test('that a new collection can be made based on an invalid state', () => {
    const newCollection = Collection.fromState('test', {}, {});

    expect(() => newCollection.items).not.toThrow(TypeError);

    expect(newCollection.isLoaded).toBeFalsy();
  });

  test('that a failed request resets the loading state', () => {
    const repositoryRejectFindMock = jest.fn(() => Promise.reject());

    const productRejectRepository = {
      find: repositoryRejectFindMock,
    };

    const rejectCollection = Collection.create('product', productRejectRepository);

    expect.assertions(3);

    return rejectCollection.load().catch(() => {
      expect(productRejectRepository.find).toHaveBeenCalled();

      expect(collection.isLoading).toBeFalsy();
      expect(collection.isLoaded).toBeFalsy();
    });
  });

  test('that a response without paging information does not cause the Collection to fault', () => {
    const noPagingmockResponse = {
      data: [
        { id: '1', type: 'products', data: { title: 'Product 1' } },
        { id: '2', type: 'products', data: { title: 'Product 2' } },
      ],
    };

    const repositoryFindNoPagingMock = jest.fn(() => Promise.resolve(noPagingmockResponse));

    const productRepositoryNoPaging = {
      find: repositoryFindNoPagingMock,
    };

    const collectionNoPaging = Collection.create('product', productRepositoryNoPaging);

    return collectionNoPaging.load().then(() => {
      expect(collectionNoPaging.length).toEqual(2);
      expect(collectionNoPaging.pages).toEqual(0);
      expect(collectionNoPaging.isLoading).toBeFalsy();
      expect(collectionNoPaging.isLoaded).toBeTruthy();
    });
  });

  test('that a collection will only load once if the parameterBag does not change', () => {
    const repositoryFindOnceMock = jest.fn(() => Promise.resolve(mockResponse));

    const productRepositoryOnceMock = {
      find: repositoryFindOnceMock,
    };

    const collectionOnce = Collection.create('product', productRepositoryOnceMock);

    return collectionOnce.load().then(() => {
      expect(repositoryFindOnceMock).toHaveBeenCalledTimes(1);

      collection.load().then(() => {
        expect(repositoryFindOnceMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  test('that a collection will only load items again if the parameterBag had changed after loading', () => {
    const repositoryFindOnceMock = jest.fn(() => Promise.resolve(mockResponse));

    const productRepositoryOnceMock = {
      find: repositoryFindOnceMock,
    };

    const collectionOnce = Collection.create('product', productRepositoryOnceMock);

    return collectionOnce.load().then(() => {
      expect(repositoryFindOnceMock).toHaveBeenCalledTimes(1);

      const paramBag = collectionOnce.parameterBag;
      paramBag.setParams({ test: 'param' });
      collectionOnce.parameterBag = paramBag;

      collectionOnce.load().then(() => {
        expect(repositoryFindOnceMock).toHaveBeenCalledTimes(2);
      });
    });
  });
});
