/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */
import Collection from '../../../Resource/Resource/Collection';

const createStoreModule = (repository) => {
  return {
    namespaced: true,

    state: {
      items: {},
      collections: {},
    },

    getters: {
      item: state => id => state.items[id] || {},
      collection: state => (name) => {
        const collectionData = state.collections[name] || { name };
        return Collection.fromState(collectionData, repository);
      },
    },

    mutations: {
      SET_COLLECTION(state, payload) {
        state.collections[payload.name] = payload.state;
      },
      SET_ITEM(state, item) {
        state.items[item[repository.identifier]] = item;
      },
    },
  };
};

export default createStoreModule;
