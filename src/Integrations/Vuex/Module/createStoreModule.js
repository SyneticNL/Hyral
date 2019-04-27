/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */
import createVuexCollectionFromState from '../Collection/createVuexCollectionFromState';
import Resource from '../../../Resource/Resource';

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
    resource: state => id => Resource.fromState(
      state.resources[id] || { id, type: repository.resourceType },
    ),
    collection: state => (name) => {
      const collectionState = state.collections[name] || { };

      return createVuexCollectionFromState(name, collectionState, repository, store);
    },
  },

  mutations: {
    SET_COLLECTION(state, collection) {
      state.collections[collection.name] = collection.state;
    },
    SET_RESOURCE(state, resource) {
      state.resources[resource[repository.identifier]] = resource.state;
    },
  },

  actions: {
    LOAD_RESOURCE({ commit }, id) {
      repository.findById(id);
    },
  },

});

export default createStoreModule;
