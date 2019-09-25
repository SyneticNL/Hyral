/**
 * @param {HyralResource} item
 * @param {Object<HyralResource[]>} includedRelations
 *
 * @returns {HyralResource}
 */
export default function relationshipGetResource(item, includedRelations) {
  const resource = includedRelations[`${item.type}-${item.id}`] || item;

  if (!item.meta) {
    return resource;
  }

  resource.meta = Object.assign({}, resource.state.meta, item.meta);

  return resource;
}
