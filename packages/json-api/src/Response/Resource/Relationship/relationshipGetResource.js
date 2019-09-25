import Resource from '@hyral/core/lib/Resource/Resource';

/**
 * @param {{id: String, type: String, meta: Object|null}} item
 * @param {Object<Resource[]>} includedRelations
 *
 * @returns {Resource}
 */
export default function relationshipGetResource(item, includedRelations) {
  // item is resource
  const resource = includedRelations[`${item.type}-${item.id}`] || Resource.create(
    item.id,
    item.type,
  );

  if (!item.meta) {
    return resource;
  }

  return Resource.fromState(resource.id, resource.type, Object.assign(
    {},
    resource.state,
    {
      meta: Object.assign({}, resource.state.meta, item.meta),
    },
  ));
}
