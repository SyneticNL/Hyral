import { Resource } from '@hyral/core';
import { IData } from '../../../__types__';

/**
 * Combines the meta from the resource and its included relations
 */
export default function relationshipGetResource(
  item: Resource<IData>, includedRelations: Record<string, Resource<IData>>,
): Resource<IData> {
  const resource = includedRelations[`${item.type}-${item.id as string}`] || item;

  if (!item.meta) {
    return resource;
  }

  resource.meta = { ...resource.meta, ...item.meta };

  return resource;
}
