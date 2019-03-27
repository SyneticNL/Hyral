/**
 * @param {Object} resource
 */
import resourceFactory from '../../../Resource/Factory/resourceFactory';
import relationshipGetType from './relationship/relationshipGetType';

/**
 * @typedef JsonApiResource
 *
 * @type {Object}
 * @property {String|Number} id
 * @property {String} type
 * @property {Object} attributes
 * @property {Object} relationships
 *
 */

/**
 * @param {JsonApiResource} data
 *
 * @returns {HyralResource}
 */
export default function normalizeResource(data) {
  const resource = resourceFactory(data.id, data.type, data.attributes);

  resource.metadata.relationships = {};

  if (!data.relationships) {
    return resource;
  }

  Object.entries(data.relationships).forEach(([field, relation]) => {
    resource.metadata.relationships[field] = {
      isMany: Array.isArray(relation.data),
      type: relationshipGetType(relation),
      data: relation.data,
    };
  });

  return resource;
}
