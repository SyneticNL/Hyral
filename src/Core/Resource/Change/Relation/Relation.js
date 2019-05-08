import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

/**
 * @param {HyralResource} resource
 * @param {string} relation
 *
 * @returns {HyralResource[]}
 */
export function getRelatedResources(resource, relation) {
  if (isEmpty(resource.data[relation])) {
    return [];
  }

  return Array.isArray(resource.data[relation])
    ? resource.data[relation]
    : [resource.data[relation]];
}

/**
 *
 * @param resource
 * @returns {HyralResource[]}
 */
export function getAllRelatedResources(resource) {
  if (!resource.relationships) {
    return [];
  }

  return flatten(
    Object.keys(resource.relationships).map(
      relation => getRelatedResources(resource, relation),
    ),
  );
}

/**
 * @param {HyralResource} resource
 *
 * @returns {string[]}
 */
export function getChangedResourceRelations(resource) {
  if (!resource.relationships) {
    return [];
  }

  return Object.keys(resource.relationships).filter((relation) => {
    return !isEqual(
      getRelatedResources(resource.stateStack[0], relation).map(
        relatedResource => relatedResource.id,
      ),
      getRelatedResources(resource, relation).map(
        relatedResource => relatedResource.id,
      ),
    );
  });
}
