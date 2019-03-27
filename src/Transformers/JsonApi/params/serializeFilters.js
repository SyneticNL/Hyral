/**
 * @param {ParameterBag} parameterBag
 */
export default function serializeFilters(parameterBag) {
  const filters = {};

  parameterBag.filters.forEach((filter) => {
    filters[filter.field] = filter.value;
  });

  return {
    filter: filters,
  };
}
