import isEqual from 'lodash/isEqual';

/**
 * @param {HyralResource} resource
 *
 * @returns {boolean}
 */
export function resourceIsNew(resource) {
  return resource.id === null;
}

/**
 * @param {HyralResource} resource
 *
 * @returns {boolean}
 */
export function resourceHasChanged(resource) {
  return !isEqual(resource.stateStack[0], resource.state);
}
