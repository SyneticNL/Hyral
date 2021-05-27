import { Resource } from '@hyral/core';
import { Component } from 'vue/types';
import { Store } from 'vuex';

// =====
// TYPES
// =====
export type IContext = {
  store: IStore;
  route: IRoute;
  redirect: (path: string) => void;
};

export type IRoute = {
  path: string;
  props?: { default: { drupal: boolean } };
  matched: IRoute[];
};

export type IDruxtRouterRoute = {
  resolvedPath: string;
};

export type IDruxtRouterResponse = {
  statusCode?: string | number;
  route: IDruxtRouterRoute;
};

// The mapping of entities in the front-end
export type IMapping = {
  nodes: string[];
  menus: string[];
  entities: Record<string, unknown>;
};

export type IOptions<T> = {
  mapping: T;
  baseUrl: string;
  name?: string;
};

export type INuxtContext = {
  requireModule?: (modulePath: string, once?: boolean) => Promise<void>;
};

export type ID = string | number;
export type IMenu = {
  id: ID;
  parent: ID;
};

export type IComponentContext = {
  $store: {
    dispatch: (type: string, payload: string) => Promise<{ error?: any }>
  }
};

// ====================
// ABSTRACTS FOR MIXINS
// ====================
export interface IStore extends Store<any> {
  state :{
    druxtRouter: {
      route: {
        props: {
          uuid: string,
          type: string,
        }
      }
    }
  };
  dispatch: (type: string, payload?: any) => Promise<IDruxtRouterResponse>;
}

export interface IHyralEntity {
  $attrs: Record<string, any>;
  $slots: Record<string, unknown>;
  resource: Resource<unknown> | null;
  resourceAsProp: Resource<unknown>;
  $store: IStore;
  mapping: Record<string, Component>;
  getEntity(type?: string): Component;
}
