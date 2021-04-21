import { stringify } from 'qs';
import { ParameterBag, IParamsSerializer } from '@hyral/core';
import serializeFilters from './Params/serializeFilters';
import serializeParams from './Params/serializeParams';
import serializeSorting from './Params/serializeSorting';
import serializePaging from './Params/serializePaging';

/**
 * Serializes all parameters into a string format using QS
 */
const paramsSerializer: IParamsSerializer<ParameterBag> = (parameterBag?: ParameterBag | null): string => {
  if (!parameterBag || !parameterBag.filters) {
    return '';
  }

  return stringify({
    ...serializeFilters(parameterBag),
    ...serializePaging(parameterBag),
    ...serializeSorting(parameterBag),
    ...serializeParams(parameterBag),
  });
};

export default paramsSerializer;
