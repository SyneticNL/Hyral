import serializeFilters from './params/serializeFilters';
import serializeParams from './params/serializeParams';
import serializeSorting from './params/serializeSorting';
import serializePaging from './params/serializePaging';
import qs from 'qs';

/**
 * @param {ParameterBag} parameterBag
 */
export default function paramsSerializer(parameterBag) {
  return qs.stringify(
    Object.assign(
      {},
      serializeFilters(parameterBag),
      serializePaging(parameterBag),
      serializeSorting(parameterBag),
      serializeParams(parameterBag),
    ),
  );
}
