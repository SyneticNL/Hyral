/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */
import createVuexCollectionFromState from '../Collection/createVuexCollectionFromState';

/**
 * @param {HyralRepository} repository
 * @param {Object} store
 * @returns {object}
 */
const createStoreModule = (repository, store) => ({
  namespaced: true,

  state: {
    resources: {},
    collections: {},
  },

  getters: {
    resource: state => id => state.resources[id] || {},
    collection: state => (name) => {
      const collectionState = state.collections[name] || { };

      return createVuexCollectionFromState(name, collectionState, repository, store);
    },
  },

  mutations: {
    SET_COLLECTION(state, payload) {
      state.collections[payload.name] = payload.state;
    },
    SET_RESOURCE(state, resource) {
      state.resources[resource[repository.identifier]] = resource;
    },
  },
});

export default createStoreModule;
