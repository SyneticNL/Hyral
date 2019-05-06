import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

/**
 *
 * @param resource
 * @returns {HyralResource[]}
 */
export function getRelatedResources(resource) {
  return flatten(
    Object.entries(resource.relationships).map((relation) => {
      if (isEmpty(resource.data[relation[0]])) {
        return [];
      }

      if (relation[1].cardinality === 'one-to-one' || relation[1].cardinality === 'many-to-one') {
        return [resource.data[relation[0]]];
      }

      return resource.data[relation[0]];
    }),
  );
}

/**
 * @param {HyralResource} resource
 *
 * @returns {string[]}
 */
export function getChangedResourceRelations(resource) {
  return Object.keys(resource.relationships).filter(
    relation => !isEqual(resource.stateStack[0].data[relation], resource.data[relation]),
  );
}
