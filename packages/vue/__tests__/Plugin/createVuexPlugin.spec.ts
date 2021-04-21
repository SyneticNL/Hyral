import createVuexPlugin from '../../src/Plugin/createVuexPlugin';

describe('The createVuexPlugin', () => {
  test('that a module is created only once', () => {
    const repositories = {
      book: { resourceType: 'book' },
      product: { resourceType: 'product' },
    };

    const repositoryManager: any = {
      getRepositories: jest.fn(() => repositories),
    };

    const mockStore = {
      registerModule: jest.fn(),
    };

    createVuexPlugin(repositoryManager, 'service')(mockStore as any);

    expect(mockStore.registerModule).toHaveBeenCalledTimes(1);
  });
});
