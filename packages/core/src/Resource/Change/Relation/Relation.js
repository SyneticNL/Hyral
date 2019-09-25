import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { previousState } from '../../../State/State';
import { resourceHasChanged, resourceIsNew } from '../Inspection';

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

  if (resourceIsNew(resource)) {
    return Object.keys(resource.relationships);
  }

  if (!resourceHasChanged(resource)) {
    return [];
  }

  return Object.keys(resource.relationships).filter(relation => !isEqual(
    getRelatedResources(previousState(resource.stateStack), relation).map(
      relatedResource => relatedResource.id,
    ),
    getRelatedResources(resource, relation).map(
      relatedResource => relatedResource.id,
    ),
  ));
}

/**
 * @param {HyralResource} resource
 *
 * @returns {HyralResource[]}
 */
export function getDeletedOneToOneRelatedResources(resource) {
  if (isEmpty(resource.relationships)) {
    return [];
  }

  if (resourceIsNew(resource)) {
    return [];
  }

  if (!resourceHasChanged(resource)) {
    return [];
  }

  return Object.keys(resource.relationships)
    .filter(relation => resource.relationships[relation].cardinality === 'one-to-one')
    .filter(relation => getRelatedResources(resource, relation).length === 0)
    .filter(
      relation => getRelatedResources(previousState(resource.stateStack), relation).length !== 0,
    )
    .map(relation => getRelatedResources(previousState(resource.stateStack), relation)[0]);
}
