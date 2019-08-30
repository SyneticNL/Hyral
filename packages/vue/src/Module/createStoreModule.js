/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */
import Vue from 'vue';
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
    resource: state => id => state.resources[id] ? Resource.fromState(
      id,
      repository.resourceType,
      state.resources[id],
    ) : null,
    collection: state => name => state.collections[name] ? createVuexCollectionFromState(
      name,
      state.collections[name],
      repository,
      store,
    ) : null,
  },

  mutations: {
    SET_COLLECTION(state, collection) {
      Vue.set(state.collections, collection.name, collection.state);
    },
    SET_RESOURCE(state, resource) {
      Vue.set(state.resources, resource.id, resource.state);
    },
  },

  actions: {
    LOAD_RESOURCE({ state, commit }, id, parameterBag = null) {
      if (!state.resources[id]) {
        commit('SET_RESOURCE', { id, type: repository.resourceType });
      }

      return repository.findById(id, parameterBag).then((resource) => {
        commit('SET_RESOURCE', resource);
      });
    },
    LOAD_COLLECTION({ getters }, name) {
      return getters.collection(name).load();
    },
  },
});

export default createStoreModule;
