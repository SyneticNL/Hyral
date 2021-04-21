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

  // If there is a matched path but there is no drupal prop on the route return
  if (matched.length && !matched[0].props?.default?.drupal) return;

  // If the response is invalid return
  const response = await store.dispatch('druxtRouter/get', path);
  if (response.statusCode) return;

  // Check if redirecting to resolved path is necessary
  const { resolvedPath } = response.route;
  if (resolvedPath !== path) redirect(resolvedPath);
};
