import { Collection, Repository, Resource } from '@hyral/core';
import Vue from 'vue';
import { Module } from 'vuex';
import createVuexCollectionFromState from '../Collection/createVuexCollectionFromState';
import { IContext, IState } from '../__types__';

const reducer = (a: Record<string, any>, b: Record<string, any>) => ({ ...a, ...b });

/**
 * Creates a store module for Hyral
 */
const createStoreModule = (repositories: Record<string, Repository<unknown>>): Module<IState, unknown> => ({
  namespaced: true,

  state: {
    resources: Object.keys(repositories).map((key) => ({ [key]: {} })).reduce(reducer, {}),
    collections: Object.keys(repositories).map((key) => ({ [key]: {} })).reduce(reducer, {}),
  },

  getters: {
    resource: (state: IState) => (type: string) => (id: string) => (
      state.resources[type] && state.resources[type][id]
        ? state.resources[type][id]
        : null
    ),
    collection: (state: IState) => (type: string) => (name: string) => (
      state.collections[type] && state.collections[type][name]
        ? createVuexCollectionFromState(name, state, repositories[type])
        : null
    ),
  },

  mutations: {
    SET_RESOURCE(state: IState, resource: Resource<unknown>) {
      Vue.set(state.resources[resource.type], resource.id as string, resource);
    },
    SET_COLLECTION(state: IState, collection: Collection<unknown>) {
      Vue.set(collection, 'repository', repositories[collection.type]);
      Vue.set(state.collections[collection.type], collection.name, collection);
    },
  },

  actions: {
    async LOAD_RESOURCE({ state, commit }: IContext, resource: Resource<unknown>) {
      const { id, type } = resource;
      if (!id || !state.resources[type] || state.resources[type][id]) {
        return;
      }

      const response = await repositories[resource.type].findById(id);
      commit('SET_RESOURCE', Array.isArray(response) ? new Resource(id, type, response) : response);
    },
    async LOAD_COLLECTION({ commit }: IContext, collection: Collection<unknown>) {
      await collection.load();
      commit('SET_COLLECTION', collection);
    },
  },
});

export default createStoreModule;
