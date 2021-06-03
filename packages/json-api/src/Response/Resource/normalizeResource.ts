import { Resource } from '@hyral/core';
import relationshipGetType from './Relationship/relationshipGetType';
import { IData, IJsonApiResource } from '../../__types__';

function guessRelationCardinality(relation: Resource<IData>) {
  return Array.isArray(relation.data) ? 'one-to-many' : 'many-to-one';
}

function transformResource(item: IJsonApiResource): Resource<IData> {
  return new Resource(item.id, item.type, item.attributes, null, item.meta);
}

function flattenData(source: IData): unknown {
  const resources = transformResource(source as IJsonApiResource);
  const isResource = (value: IData) => value && typeof value === 'object' && 'id' in value && 'type' in value;

  Object.entries(resources.data).forEach(([key, value]) => {
    if (isResource(value)) {
      resources.data[key] = flattenData(value);
    }

    if (Array.isArray(value)) {
      resources.data[key] = value.map((item: IData) => (isResource(item) ? flattenData(item) : item));
    }
  });

  return resources;
}

function getResourcesFromData(data: IJsonApiResource): Record<string, Resource<IData>> {
  return Object.entries(data.relationships)
    .reduce((carry, [field, relation]) => {
      if (!relation.data) {
        return carry;
      }

      const flattenableData = data.attributes && data.attributes[field]
        ? data.attributes[field] as IData
        : relation.data;

      const resources = Array.isArray(flattenableData)
        ? flattenableData.map((item) => flattenData(item))
        : flattenData(flattenableData);
      return { [field]: resources, ...carry };
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
    Object.assign(data.attributes ?? {}, getResourcesFromData(data)),
    null,
    data.meta || null,
  );

  if (Object.keys(data.relationships).length > 0) {
    resource.relationships = getRelationDefinitionFromData(data);
  }
  return resource;
}
