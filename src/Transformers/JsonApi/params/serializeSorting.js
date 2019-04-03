/**
 * @param {ParameterBag} parameterBag
 */
export default function serializeSorting(parameterBag) {
  if (parameterBag.sorting.length === 0) {
    return null;
  }
  const sorting = parameterBag.sorting.map((sort) => {
    const direction = sort.direction === 'desc' ? '-' : '';

    return `${direction}${sort.field}`;
  });

  return {
    sort: sorting.join(','),
  };
}
