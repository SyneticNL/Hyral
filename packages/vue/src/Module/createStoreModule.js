/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */
import Resource from '@hyral/core/lib/Resource/Resource';
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
    resource: state => id => Resource.fromState(
      id,
      repository.resourceType,
      state.resources[id] || { id, type: repository.resourceType },
    ),
    collection: state => (name) => {
      if (!state.collections[name]) {
        state.collections[name] = {};
      }

      return createVuexCollectionFromState(name, state.collections[name], repository, store);
    },
  },

  mutations: {
    SET_COLLECTION(state, collection) {
      state.collections[collection.name] = collection.state;
    },
    SET_RESOURCE(state, resource) {
      state.resources[resource.id] = resource.state;
    },
  },

  actions: {
    LOAD_RESOURCE({ commit }, id) {
      return repository.findById(id).then((resource) => {
        commit('SET_RESOURCE', resource);
      });
    },
    LOAD_COLLECTION({ getters }, name) {
      return getters.collection(name).load();
    },
  },
});

export default createStoreModule;
