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
    resource: state => (id) => {
      if (!state.resources[id]) {
        store.commit(`hyral_${repository.resourceType}/SET_RESOURCE`, { id, type: repository.resourceType });
      }

      return Resource.fromState(id, repository.resourceType, state.resources[id]);
    },
    collection: state => (name) => {
      if (!state.collections[name]) {
        store.commit(`hyral_${repository.resourceType}/SET_COLLECTION`, {});
      }

      return createVuexCollectionFromState(name, state.collections[name], repository, store);
    },
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
