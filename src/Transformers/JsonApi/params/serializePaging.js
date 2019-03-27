/**
 * @param {ParameterBag} parameterBag
 *
 * @return {{page: {offset: Number, limit: Number}}}
 */
export default function serializePaging(parameterBag) {
  return {
    page: parameterBag.paging,
  };
}
