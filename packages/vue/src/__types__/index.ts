import {
  Collection, Resource, ParameterBag,
} from '@hyral/core';
import Vue from 'vue';
import { Store } from 'vuex';

// =====
// TYPES
// =====
export type IState = {
  resources: Record<string, Record<string, Resource<unknown>>>;
  collections: Record<string, Record<string, Collection<unknown>>>;
};

export type ICommit = {
  (name: string, payload: unknown): void
};

export type IGetters = {
  resource: (resourceType: string) => (id: string) => Resource<unknown> | null;
  collection: (resourceType: string) => (name: string) => Collection<unknown> | null;
};

export type IContext = {
  state: IState;
  commit: ICommit;
  getters: IGetters;
};

// ====================
// ABSTRACTS FOR MIXINS
// ====================
export type ICollectionGetter = (j: string) => (i:string) => Collection<unknown> | null;
export type IResourceGetter = (j: string) => (i:string) => Resource<unknown> | null;

export interface IStore<T> extends Store<T> {
  getters: Record<string, ICollectionGetter | IResourceGetter>;
}

export interface IMixin<T> extends Vue {
  $store: IStore<T>;
  hyralService?: string;
}

export interface ICollectionMixin extends IMixin<Collection<unknown>> {
  source?: Collection<unknown> | null;
  collection: Collection<unknown>;
  initCollection(): void;
  loadCollection(): Promise<void>;
}

export interface IResourceMixin extends IMixin<Resource<unknown>> {
  source: Resource<unknown> | null;
  parameterBag?: ParameterBag;
  loadResource(): Promise<void>;
}
