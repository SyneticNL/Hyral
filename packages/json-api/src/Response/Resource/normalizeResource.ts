import { Resource } from '@hyral/core';
import relationshipGetType from './Relationship/relationshipGetType';
import { IData, IItem, IJsonApiResource } from '../../__types__';

function guessRelationCardinality(relation: Resource<IData>) {
  return Array.isArray(relation.data) ? 'one-to-many' : 'many-to-one';
}

function transformResource(item: IItem): Resource<IData> {
  return new Resource(item.id, item.type, null, null, item.meta);
}

function getResourcesFromData(data: IJsonApiResource): Record<string, Resource<IData>> {
  return Object.entries(data.relationships)
    .reduce((carry, [field, relation]) => {
      if (!relation.data) {
        return carry;
      }
      const resources = Array.isArray(relation.data)
        ? relation.data.map((item: IItem) => transformResource(item))
        : transformResource(relation.data as IItem);

      return Object.assign(carry, { [field]: resources });
    }, {});
}

function getRelationDefinitionFromData(data: IJsonApiResource) {
  return Object.entries(data.relationships)
    .reduce((resourceRelationships, [field, relation]) => Object.assign(
      resourceRelationships,
      {
        [field]: {
          cardinality: guessRelationCardinality(relation),
          many: Array.isArray(relation.data),
          resource: relationshipGetType(relation),
        },
      },
    ), {});
}

/**
 * Normalizes a single JSON data object into a Hyral Resource
 */
export default function normalizeResource(data: IJsonApiResource): Resource<IData> {
  if (!data.relationships) {
    return new Resource(data.id, data.type, data.attributes, null, data.meta);
  }

  const resource = new Resource(
    data.id,
    data.type,
    Object.assign(data.attributes, getResourcesFromData(data)),
    null,
    data.meta || null,
  );

  if (Object.keys(data.relationships).length > 0) {
    resource.relationships = getRelationDefinitionFromData(data);
  }
  return resource;
}
