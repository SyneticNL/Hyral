/**
 * @param {ParameterBag} parameterBag
 */
export default function serializeSorting(parameterBag) {
  const sorting = parameterBag.sorting.map((sort) => {
    const direction = sort.direction === 'desc' ? '-' : '';

    return `${direction}${sort.field}`;
  });

  return {
    sort: sorting.join(',') || {},
  };
}
