import { ParameterBag } from '@hyral/core';
import { IserializedSorting } from '../../__types__';

/**
 * Serializes the sorting from the ParameterBag
 */
export default function serializeSorting(parameterBag: ParameterBag | Partial<ParameterBag>): IserializedSorting | null {
  if (parameterBag.sorting?.length === 0) {
    return null;
  }
  const sorting = parameterBag.sorting?.map((sort) => {
    const direction = sort.direction === 'desc' ? '-' : '';

    return `${direction}${sort.field}`;
  });

  return {
    sort: sorting?.join(','),
  };
}
