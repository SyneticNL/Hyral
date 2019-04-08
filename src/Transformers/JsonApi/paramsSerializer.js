import qs from 'qs';
import serializeFilters from './Params/serializeFilters';
import serializeParams from './Params/serializeParams';
import serializeSorting from './Params/serializeSorting';
import serializePaging from './Params/serializePaging';

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
