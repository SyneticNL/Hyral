/**
 * @param {HyralResource} resource
 *
 * @returns {{type, id}}
 */
export default function serializeRelationship(resource) {
  return {
    type: resource.type,
    id: resource.id.toString(),
  };
}
