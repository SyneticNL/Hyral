import Vue from 'vue';
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

export type IOptions = {
  mapping?: {
    nodes: string[],
    menus: string[],
    entities: Record<string, unknown>
  };
  baseUrl?: string;
};

export type INuxtContext = {
  addPlugin?: (plugin: any) => void;
  requireModule?: (modulePath: string, once?: boolean) => Promise<void>;
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

export interface IDrupalMixin {
  mixins: any[],
  uuid: string,
  type: string,
  $store: IStore;
  mapping: Record<string, Vue>;
}
