import stringify from 'qs/lib/stringify';
import serializeFilters from './Params/serializeFilters';
import serializeParams from './Params/serializeParams';
import serializeSorting from './Params/serializeSorting';
import serializePaging from './Params/serializePaging';

/**
 * @param {ParameterBag} parameterBag
 */
export default function paramsSerializer(parameterBag) {
  if (!parameterBag || !parameterBag.filters) {
    return '';
  }

  return stringify({
    ...serializeFilters(parameterBag),
    ...serializePaging(parameterBag),
    ...serializeSorting(parameterBag),
    ...serializeParams(parameterBag),
  });
}
