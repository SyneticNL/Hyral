import Collection from '../../Resource/Resource/Collection';
import createStoreModule from './Module/createStoreModule';

const createVuexPlugin = (repositoryManager) => {
  const plugin = (store) => {
    Collection.prototype.loadItems = function () {
      this.load().then(() => {
        store.commit(`hyral_${this.repository.resourceType}/SET_COLLECTION`, {
          name: this.name,
          state: this.state,
        });
      });
    };

    Object.entries(repositoryManager.getRepositories()).forEach(([key, repository]) => {
      const module = createStoreModule(repository);
      store.registerModule(`hyral_${key}`, module);
    });
  };
  return plugin;
};

export default createVuexPlugin;
