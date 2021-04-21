import { Collection, Resource, ParameterBag } from '@hyral/core';
import Vue from 'vue';
import { Store } from 'vuex';

// =====
// TYPES
// =====
// resources.<resourceType>.<id>
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

export type IResourcePayload = { id: string | number, resourceType: string, parameterBag?: ParameterBag };
export type ICollectionPayload = { name: string, resourceType: string, parameterBag?: ParameterBag };

// ====================
// ABSTRACTS FOR MIXINS
// ====================
export interface IStore<T> extends Store<T> {
  getters: Record<string, (j: string) => (i:string) => T>;
}

export interface ICollectionMixin extends Vue {
  $store: IStore<Collection<unknown>>;
  collection: Collection<unknown> | null;
  resourceType: string;
  collectionName: string;
  hyralService: string;
  parameterBag: ParameterBag;
  loadCollection(): Promise<void>;
  initCollection(): void;
}

export interface IResourceMixin extends Vue {
  $store: IStore<Resource<unknown>>;
  resource: Resource<unknown> | null;
  resourceType: string;
  id: string;
  hyralService: string;
  parameterBag: ParameterBag;
  loadResource(): Promise<void>;
}
