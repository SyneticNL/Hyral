import { Repository, Resource } from '@hyral/core';
import Vue from 'vue';
import { Module } from 'vuex';
import createVuexCollectionFromState from '../Collection/createVuexCollectionFromState';
import {
  IContext,
  ICollectionPayload,
  IResourcePayload,
  IState,
} from '../__types__';

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
    repository: () => (type: string) => repositories[type],
  },

  mutations: {
    SET_RESOURCE(state: IState, resource: Resource<unknown>) {
      Vue.set(state.resources[resource.type], resource.id as string, resource);
    },
    SET_COLLECTION(state: IState, { name, type, collection }) {
      Vue.set(state.collections[type as string], name, collection);
    },
  },

  actions: {
    async LOAD_RESOURCE({ state, commit }: IContext, { id, type, parameterBag }: IResourcePayload) {
      if (!state.resources[type] || state.resources[type][id]) {
        return;
      }

      const response = await repositories[type].findById(id, parameterBag);
      if (Array.isArray(response)) {
        commit('SET_RESOURCE', new Resource(id, type, response));
        return;
      }
      commit('SET_RESOURCE', await repositories[type].findById(id, parameterBag));
    },
    async LOAD_COLLECTION({ getters }: IContext, { name, type }: ICollectionPayload) {
      const collection = getters.collection(type)(name);

      if (collection) {
        await collection.load();
      }
    },
  },
});

export default createStoreModule;
