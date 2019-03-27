import qs from 'qs';
import serializeFilters from './params/serializeFilters';
import serializeParams from './params/serializeParams';
import serializeSorting from './params/serializeSorting';
import serializePaging from './params/serializePaging';

/**
 * @param {ParameterBag} parameterBag
 */
export default function paramsSerializer(parameterBag) {
  return qs.stringify({
    ...serializeFilters(parameterBag),
    ...serializePaging(parameterBag),
    ...serializeSorting(parameterBag),
    ...serializeParams(parameterBag),
  });
}
