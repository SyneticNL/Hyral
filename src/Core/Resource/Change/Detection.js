import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import flatten from 'lodash/flatten';

/**
 *
 * @param resource
 * @returns {HyralTask[]}
 */
export function getRelatedResources(resource) {
  return flatten(
    Object.entries(resource.relationships).map((relation) => {
      if (isEmpty(resource.data[relation[0]])) {
        return [];
      }

      if (relation[1].cardinality === 'one-to-one' || relation[1].cardinality === 'one-to-many') {
        return [resource.data[relation[0]]];
      }

      return resource.data[relation[0]];
    }),
  ).filter();
}

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

/**
 * @param {HyralResource} resource
 *
 * @returns {string[]}
 */
export function getChangedResourceRelations(resource) {
  const originalData = resource.stateStack[0];

  Object.keys(resource.relationships).filter(
    relation => !isEqual(originalData[relation], resource.data[relation]),
  );
}
