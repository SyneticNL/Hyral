import { Resource } from '@hyral/core';
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
export default async (context: IContext): Promise<void> => {
  const { path, matched } = context.route;

  // If there is no matched path with drupal service
  if (!matched.some((record) => record.meta?.services?.some((str) => str === 'drupal'))) {
    return;
  }

  // Retrieve the drupal route
  const match = matched.find((record) => record.meta?.resolve);
  const druxtPath = createResolve(path, match?.meta?.resolve, match?.path);

  const result = await context.store.dispatch('druxtRouter/get', druxtPath);
  const { uuid, type } = result.route.props;
  const props = { source: new Resource(uuid, type) };

  // TODO: put the props on the target route
};
