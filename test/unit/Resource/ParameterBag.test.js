import ParameterBag from '../../../src/Resource/ParameterBag';

describe('The parameter bag', () => {
  const parameterBag = new ParameterBag();

  it('should be initialized with default empty values', () => {
    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  it('should contain proper setters and getters for filters, paging, sorting and params', () => {
    const params = {
      key1: 'value1',
      key2: 'value2',
    };
    const filters = [
      {
        field: 'f1',
        value: 'v1',
      },
    ];
    const paging = {
      offset: 0,
    };
    const sorting = [
      {
        field: 'f1',
        direction: 'asc',
      },
    ];
    parameterBag.filters = filters;
    parameterBag.params = params;
    parameterBag.paging = paging;
    parameterBag.sorting = sorting;

    expect(parameterBag.filters).toBe(filters);
    expect(parameterBag.params).toBe(params);
    expect(parameterBag.paging).toBe(paging);
    expect(parameterBag.sorting).toBe(sorting);
  });
});
