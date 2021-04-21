import { ParameterBag } from '@hyral/core';
import { IserializedFilter } from '../../__types__';

/**
 * Serializes the filters from the ParameterBag
 */
export default function serializeFilters(parameterBag: ParameterBag | Partial<ParameterBag>): IserializedFilter {
  const filters: Record<string, string> = {};

  parameterBag.filters?.forEach(({ field, value }) => {
    filters[field] = value;
  });

  return {
    filter: filters,
  };
}
