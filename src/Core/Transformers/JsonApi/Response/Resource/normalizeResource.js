import Resource from '../../../../Resource/Resource';
import relationshipGetType from './Relationship/relationshipGetType';

function guessRelationCardinality(relation) {
  return Array.isArray(relation.data) ? 'many-to-many' : 'one-to-many';
}

/**
 * @param {JsonApiResource} data
 *
 * @returns {HyralResource}
 */
export default function normalizeResource(data) {
  const resource = Resource(data.id, data.type, data.attributes);

  if (!data.relationships) {
    return resource;
  }

  Object.entries(data.relationships).forEach(([field, relation]) => {
    resource.relationships[field] = {
      cardinality: guessRelationCardinality(relation),
      many: Array.isArray(relation.data),
      resource: relationshipGetType(relation),
    };

    resource.data[field] = relation.data;
  });

  return resource;
}
