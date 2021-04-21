import { IRepositoryManager } from '@hyral/core';
import { Store } from 'vuex';
import createStoreModule from '../Module/createStoreModule';

const createVuexPlugin = (repositoryManager: IRepositoryManager, hyralService: string) => (store: Store<unknown>): void => {
  const module = createStoreModule(repositoryManager.getRepositories());
  store.registerModule(`hyral_${hyralService}`, module);
};

export default createVuexPlugin;
