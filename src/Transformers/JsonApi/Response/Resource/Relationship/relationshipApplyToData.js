import relationshipGetResource from './relationshipGetResource';

/**
 * @param {Object<Resource[]>} items
 * @param {Object<Resource[]>} includedRelations
 */
export default function relationshipApplyToData(items, includedRelations) {
  Object.keys(items).forEach((key) => {
    Object.entries(items[key].relationships).forEach(([field, relation]) => {
      if (relation.data === null) {
        return;
      }
      if (!relation.isMany) {
        // eslint-disable-next-line no-param-reassign
        items[key].data[field] = relationshipGetResource(relation.data, includedRelations);
        return;
      }

      // eslint-disable-next-line no-param-reassign
      items[key].data[field] = relation.data.map(
        item => relationshipGetResource(item, includedRelations),
      );
    });
  });
}
