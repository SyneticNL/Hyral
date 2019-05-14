import createVuexPlugin from '../src/createVuexPlugin';

describe('The createVuexPlugin', () => {
  test('that a module is created for all registered repositories', () => {
    const repositories = {
      book: { resourceType: 'book' },
      product: { resourceType: 'product' },
    };

    const repositoryManager = {
      getRepositories: jest.fn(() => repositories),
    };

    const mockStore = {
      registerModule: jest.fn(),
    };

    createVuexPlugin(repositoryManager)(mockStore);

    expect(mockStore.registerModule).toHaveBeenCalledTimes(2);
  });
});
