import DruxtRouterModule from 'druxt-router';
import HyralMixin from './Components/HyralMixin';
import DrupalMiddleware from './Middleware/DrupalMiddleware';
import DrupalPlugin from './Plugins/DrupalPlugin';
import HyralEntity from './Components/HyralEntity';
import createWildcards from './Helpers/createWildcards';
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
  HyralMixin,
  DrupalMiddleware,
  DrupalPlugin,
  HyralEntity,
  createWildcards,
  dispatchRoutes,
  parseMenuCollection,
};

export * from './__types__';
