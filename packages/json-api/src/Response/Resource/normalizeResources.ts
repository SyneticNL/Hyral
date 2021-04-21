import { Resource } from '@hyral/core';
import { IData, IJsonApiResource } from '../../__types__';
import normalizeResource from './normalizeResource';

/**
 * Normalizes a multiple JsonApiResources from data objects into a record of Hyral Resources
 */
export default function normalizeResources(items: IJsonApiResource[]): Record<string, Resource<IData>> {
  const normalizedItems: Record<string, Resource<IData>> = {};

  items.forEach((item) => {
    normalizedItems[`${item.type}-${item.id}`] = normalizeResource(item);
  });

  return normalizedItems;
}
