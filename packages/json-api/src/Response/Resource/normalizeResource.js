import isEmpty from 'lodash/isEmpty';
import Resource from '@hyral/core/lib/Resource/Resource';
import relationshipGetType from './Relationship/relationshipGetType';

function guessRelationCardinality(relation) {
  return Array.isArray(relation.data) ? 'one-to-many' : 'many-to-one';
}

/**
 * @param {{id: String, type: String, meta: Object|null}} item
 *
 * @returns {HyralResource}
 */
function transformResource(item) {
  return Resource.create(item.id, item.type, null, null, item.meta);
}

/**
 * @param {JsonApiResource} data
 *
 * @returns {object.<string, HyralResource>}
 */
function getResourcesFromData(data) {
  return Object.entries(data.relationships)
    .reduce((carry, [field, relation]) => {
      if (!relation.data) {
        return carry;
      }
      const resources = Array.isArray(relation.data)
        ? relation.data.map(item => transformResource(item))
        : transformResource(relation.data);

      return Object.assign(carry, { [field]: resources });
    }, {});
}


/**
 * @param {JsonApiResource} data
 *
 * @returns {object.<string, HyralResourceRelationship>}
 */
function getRelationDefinitionFromData(data) {
  return Object.entries(data.relationships)
    .reduce((resourceRelationships, [field, relation]) => Object.assign(
      resourceRelationships,
      {
        [field]: {
          cardinality: guessRelationCardinality(relation),
          many: Array.isArray(relation.data),
          resource: relationshipGetType(relation),
        },
      },
    ), {});
}

/**
 * @param {JsonApiResource} data
 *
 * @returns {HyralResource}
 */
export default function normalizeResource(data) {
  if (!data.relationships) {
    return Resource.create(data.id, data.type, data.attributes, null, data.meta);
  }

  const resource = Resource.create(
    data.id,
    data.type,
    Object.assign(data.attributes, getResourcesFromData(data)),
    null,
    data.meta || null,
  );

  if (isEmpty(resource.relationships)) {
    resource.relationships = getRelationDefinitionFromData(data);
  }

  return resource;
}
