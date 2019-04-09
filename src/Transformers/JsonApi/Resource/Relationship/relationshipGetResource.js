import createResource from '../../../../Resource/Resource/ResourceFactory';

/**
 * @param {{id: String, type: String}} item
 * @param {Object<HyralResource[]>} includedRelations
 *
 * @returns {HyralResource}
 */
export default function relationshipGetResource(item, includedRelations) {
  return includedRelations[`${item.type}-${item.id}`] || createResource(
    item.id,
    item.type,
  );
}
