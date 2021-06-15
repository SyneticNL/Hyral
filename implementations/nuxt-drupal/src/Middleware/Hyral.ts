import { IContext } from '../__types__';
import createResolve from '../Helpers/createResolve';

/**
 * Nuxt-drupal middleware uses druxt-router to check for available routes in Drupal and
 * redirects accordingly to available wildcards
 *
 * @todo: Remove druxt-router dependency
 *
 * @requires druxt-router module
 */
export default async ({ store, route }: IContext): Promise<any> => {
  const { path, matched } = route;

  // If there is no matched path with drupal service
  if (!matched.some((record) => record.meta?.services?.some((str) => str === 'drupal'))) {
    return;
  }

  // Retrieve the drupal route
  const match = matched.find((record) => record.meta.resolve);
  const druxtPath = createResolve(path, match?.meta?.resolve, match?.path);

  await store.dispatch('druxtRouter/get', druxtPath);
};
