import relationshipGetResource from './relationshipGetResource';

/**
 * @param {Object<HyralResource[]>} items
 * @param {Object<HyralResource[]>} includedRelations
 */
export default function relationshipApplyToData(items, includedRelations) {
  Object.keys(items).forEach((key) => {
    Object.entries(items[key].metadata.relationships).forEach(([field, relation]) => {
      if (!relation.isMany) {
        // eslint-disable-next-line no-param-reassign
        items[key].data[field] = relationshipGetResource(relation.data, includedRelations);
        return;
      }

      // eslint-disable-next-line no-param-reassign
      items[key].data[field] = relation.data.map(
        item => relationshipGetResource(item, includedRelations)
      );
    });
  });
}
