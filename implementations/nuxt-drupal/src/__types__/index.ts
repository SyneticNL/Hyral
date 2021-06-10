import { Collection, Resource } from '@hyral/core';
import { AsyncComponent } from 'vue/types';
import { Store } from 'vuex';

// =====
// TYPES
// =====
export type IComponentContext = {
  $attrs: Record<string, any>;
  $store: IStore;
};

export interface IHyralEntity extends IComponentContext {
  viewMode: string;
  resource: Resource<unknown>;
  collection: Collection<unknown>;
  loadCollection(): void;
  loadResource(): void;
}

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
  error?: string | number;
  route: IDruxtRouterRoute;
};

// The mapping of entities in the front-end
export type IMapping =
  Record<string, AsyncComponent> |
  Record<string, Record<string, AsyncComponent>> |
  Record<string, null>;

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
  url: string;
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
  getters: Record<string, (j: string) => (i:string) => any>;
  dispatch: (type: string, payload?: any) => Promise<IDruxtRouterResponse>;
}
