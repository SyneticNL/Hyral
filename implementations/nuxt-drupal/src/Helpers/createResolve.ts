/**
 * Resolves the pathing to Drupal according to the 'meta.resolve'
 *
 * @returns resolvedPath
 */
export default (path: string, resolve?: string, match?: string): string => {
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

  if (!exclude) {
    throw new Error('Something wen\'t wrong with resolving the route. Your path and resolve might not be valid');
  }

  // Replace in path what is not wildcard
  let result = path;
  exclude.forEach((item) => {
    result = result.replace(item, '');
  });

  // Replace wildcard in resolve with result
  result = resolve.replace(/(\/:[^/]*)/, result);

  return result;
};
