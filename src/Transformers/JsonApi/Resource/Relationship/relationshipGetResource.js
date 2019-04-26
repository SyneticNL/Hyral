import Resource from '../../../../Resource/Resource/Resource';

/**
 * @param {{id: String, type: String}} item
 * @param {Object<Resource[]>} includedRelations
 *
 * @returns {Resource}
 */
export default function relationshipGetResource(item, includedRelations) {
  return includedRelations[`${item.type}-${item.id}`] || Resource(
    item.id,
    item.type,
  );
}
