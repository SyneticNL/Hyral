import {
  Collection,
  Repository,
  Resource,
} from '@hyral/core';
import Vue from 'vue';
import { Module } from 'vuex';
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
    resource: (state: IState) => (resourceType: string) => (id: string) => (
      state.resources[resourceType] && state.resources[resourceType][id]
        ? state.resources[resourceType][id]
        : null
    ),
    collection: (state: IState) => (resourceType: string) => (name: string) => (
      state.collections[resourceType] && state.collections[resourceType][name]
        ? state.collections[resourceType][name]
        : null
    ),
  },

  mutations: {
    SET_RESOURCE(state: IState, resource: Resource<unknown>) {
      Vue.set(state.resources[resource.type], resource.id as string, resource);
    },
    SET_COLLECTION(state: IState, { name, resourceType, collection }) {
      Vue.set(state.collections[resourceType as string], name, collection);
    },
  },

  actions: {
    async LOAD_RESOURCE({ state, commit }: IContext, { id, resourceType, parameterBag }: IResourcePayload) {
      if (!state.resources[resourceType]) {
        return;
      }

      if (!state.resources[resourceType][id]) {
        commit('SET_RESOURCE', await repositories[resourceType].findById(id, parameterBag));
      }
    },
    async LOAD_COLLECTION({ commit }: IContext, { name, resourceType, parameterBag }: ICollectionPayload) {
      const collection = new Collection(name, repositories[resourceType], parameterBag);

      await collection.load();
      commit('SET_COLLECTION', { name, resourceType, collection });
    },
  },
});

export default createStoreModule;
