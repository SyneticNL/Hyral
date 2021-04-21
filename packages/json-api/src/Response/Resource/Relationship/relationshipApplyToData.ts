import { Resource } from '@hyral/core';
import { IData } from '../../../__types__';
import relationshipGetResource from './relationshipGetResource';

/**
 * Maps the data from relationships of the response to the data
 */
export default function relationshipApplyToData(
  items: Record<string, Resource<IData>>,
  includedRelations: Record<string, Resource<IData>>,
): void {
  Object.values(items).forEach((resource) => {
    Object.entries(resource.relationships).forEach(([field, relation]) => {
      const resourceData = resource.data as Record<string, any>;
      if (!resourceData[field]) {
        return;
      }

      if (relation.many === false) {
        resourceData[field] = relationshipGetResource(resourceData[field], includedRelations);
        return;
      }

      const fields = resourceData[field] as [];
      resourceData[field] = fields.map((
        item: Resource<IData>,
      ) => relationshipGetResource(item, includedRelations));
    });
  });
}
