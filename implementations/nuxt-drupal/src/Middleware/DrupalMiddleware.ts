import { IContext } from '../__types__';

// TODO: Remove druxt-router dependency
/**
 * Nuxt-drupal middleware uses druxt-router to check for available routes in Drupal and
 * redirects accordingly to available wildcards
 * @requires druxt-router module
 * @requires wildcards for drupal in router
 */
export default async ({ store, route, redirect }: IContext): Promise<void> => {
  const { path, matched } = route;

  // If there is no matched path with drupal service
  if (!matched.some((record) => record.meta.services?.some((str) => str === 'drupal'))) {
    return;
  }

  // If the response is invalid return
  const response = await store.dispatch('druxtRouter/get', path);
  if (response.statusCode) return;

  // Check if redirecting to resolved path is necessary
  const { resolvedPath } = response.route;
  if (resolvedPath !== path) redirect(resolvedPath);
};
