import createStoreModule from './Module/createStoreModule';

const createVuexPlugin = repositoryManager => (store) => {
  Object.entries(repositoryManager.getRepositories()).forEach(([key, repository]) => {
    const module = createStoreModule(repository, store);
    store.registerModule(`hyral_${key}`, module);
  });
};

export default createVuexPlugin;
