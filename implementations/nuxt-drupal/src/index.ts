import DruxtRouterModule from 'druxt-router';
import HyralMiddleware from './Middleware/Drupal';
import HyralPlugin from './Plugins/Drupal';

import HyralView from './Components/View';
import HyralViewMixin from './Mixins/View';
import HyralEntity from './Components/Entity';
import HyralEntityMixin from './Mixins/Entity';
import ResourceMixin from './Mixins/Resource';

import createRoute from './Helpers/createRoute';
import dispatchRoutes from './Helpers/dispatchRoutes';
import parseMenuCollection from './Helpers/parseMenuCollection';

import { INuxtContext } from './__types__';

/**
 * Activates the druxt-router dependency
 */
export default async function DrupalModule(this: INuxtContext): Promise<void> {
  if (!this.requireModule) {
    return Promise.reject(new Error('Make sure to use the DrupalNuxtModule in a Nuxt environment'));
  }

  // Add druxt-router module
  await this.requireModule(DruxtRouterModule, true);
}

/**
 * Exports of the custom nuxt-drupal entities
 */
export {
  HyralMiddleware,
  HyralPlugin,
  HyralView,
  HyralViewMixin,
  HyralEntity,
  HyralEntityMixin,
  ResourceMixin,
  createRoute,
  dispatchRoutes,
  parseMenuCollection,
};

export * from './__types__';
