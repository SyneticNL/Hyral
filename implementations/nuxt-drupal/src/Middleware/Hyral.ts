import { IContext } from '../__types__';

/**
 * Resolves the pathing to Drupal according to the 'meta.resolve'
 * @returns resolvedPath
 */
export const createResolve = (path: string, resolve?: string, match?: string): string => {
  // If there is no resolve needed just return path
  if (!resolve) return path;

  // If resolve does not have a wildcard, it's done
  if (!(/:/.exec(resolve))) {
    return resolve;
  }

  // If there is a wildcard in resolve, the matched route should also have a wildcard
  if (!match || !(/:/.exec(match))) throw new Error('Both resolve and match need wildcards');

  // Capture what is not wildcard
  const exclude = (/(.*)\/:[^/]*(.*)/.exec(match))?.filter((item) => typeof item === 'string');

  // Replace in path what is not wildcard
  let result = path;
  exclude?.forEach((item) => {
    result = result.replace(item, '');
  });

  // Replace wildcard in resolve with result
  result = resolve.replace(/(\/:[^/]*)/, result);

  return result;
};

// TODO: Remove druxt-router dependency
/**
 * Nuxt-drupal middleware uses druxt-router to check for available routes in Drupal and
 * redirects accordingly to available wildcards
 * @requires druxt-router module
 */
export default async ({ route, store }: IContext): Promise<void> => {
  const { path, matched } = route;

  // If there is no matched path with drupal service
  if (!matched.some((record) => record.meta?.services?.some((str) => str === 'drupal'))) {
    return;
  }

  // Retrieve the drupal route
  const match = matched.find((record) => record.meta?.resolve);
  const druxtPath = createResolve(path, match?.meta?.resolve, match?.path);

  await store.dispatch('druxtRouter/get', druxtPath);
};
