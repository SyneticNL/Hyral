import resourceFactory from '../../../Resource/Factory/resourceFactory';
import relationshipGetType from './relationship/relationshipGetType';

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
