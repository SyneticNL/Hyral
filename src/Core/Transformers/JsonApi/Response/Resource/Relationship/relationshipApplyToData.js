import relationshipGetResource from './relationshipGetResource';

/**
 * @param {Object<Resource[]>} items
 * @param {Object<Resource[]>} includedRelations
 */
export default function relationshipApplyToData(items, includedRelations) {
  Object.values(items).forEach((resource) => {
    Object.entries(resource.relationships).forEach(([field, relation]) => {
      if (!resource.data[field]) {
        return;
      }

      if (relation.cardinality === 'one-to-one' || relation.cardinality === 'one-to-many') {
        // eslint-disable-next-line no-param-reassign
        resource.data[field] = relationshipGetResource(resource.data[field], includedRelations);
        return;
      }

      // eslint-disable-next-line no-param-reassign
      resource.data[field] = resource.data[field].map(
        item => relationshipGetResource(item, includedRelations),
      );
    });
  });
}
