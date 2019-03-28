import resourceFactory from '../../../../Resource/Factory/resourceFactory';

/**
 * @param {{id: String, type: String}} item
 * @param {Object<HyralResource[]>} includedRelations
 *
 * @returns {HyralResource}
 */
export default function relationshipGetResource(item, includedRelations) {
  return includedRelations[`${item.type}-${item.id}`] || resourceFactory(
    item.id,
    item.type,
  );
}
