import { Resource } from '@hyral/core';
import { AsyncComponent, Component } from 'vue/types';
import { Store } from 'vuex';

// =====
// TYPES
// =====
export type IComponentContext = {
  $store: {
    dispatch: (type: string, payload: string) => Promise<{ error?: any }>
  }
};

export type IHyralEntity = {
  $attrs: Record<string, any>;
  $store: IStore;
  $props: { viewMode?: string }
  viewMode: string;
  resource: Resource<unknown>;
  mapping: Record<string, AsyncComponent | Record<string, AsyncComponent>>;
  getEntity(type?: string, mode?: string): Component;
};

export type IRouteMetaOptions = {
  resolve?: string;
  services?: string[];
};

export type IRoute = {
  path: string;
  meta?: IRouteMetaOptions;
};

export interface IDrupalRoute extends IRoute {
  resolve?: string;
}

export interface IRecord extends IRoute {
  matched: IRecord[];
}

export type IDruxtRouterRoute = {
  resolvedPath: string;
};

export type IDruxtRouterResponse = {
  statusCode?: string | number;
  route: IDruxtRouterRoute;
};

// The mapping of entities in the front-end
// TODO: remove unnec attr
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

export type IContext = {
  store: IStore;
  route: IRecord;
  redirect: (path: string) => void;
};

export type INuxtContext = {
  requireModule?: (modulePath: string, once?: boolean) => Promise<void>;
};

export type ID = string | number;
export type IMenu = {
  id: ID;
  parent: ID;
};

// =========
// ABSTRACTS
// =========
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
