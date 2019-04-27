import Resource from '../../../../Resource/Resource';
import relationshipGetType from './Relationship/relationshipGetType';

/**
 * @param {JsonApiResource} data
 *
 * @returns {Resource}
 */
export default function normalizeResource(data) {
  const resource = Resource(data.id, data.type, data.attributes);

  if (!data.relationships) {
    return resource;
  }

  Object.entries(data.relationships).forEach(([field, relation]) => {
    resource.relationships[field] = {
      isMany: Array.isArray(relation.data),
      type: relationshipGetType(relation),
      data: relation.data,
    };
  });

  return resource;
}
