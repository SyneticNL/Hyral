/**
 * @param {{id: String, type: String, data: Object}} relation
 *
 * @returns {String|undefined}
 */
export default function relationshipGetType(relation) {
  if (!relation.data || (Array.isArray(relation.data) && relation.data.length === 0)) {
    return undefined;
  }

  if (Array.isArray(relation.data)) {
    return relation.data[0].type;
  }

  return relation.data.type;
}