import ParameterBag from '../../src/Resource/ParameterBag';

describe('ParameterBag', () => {
  test('that it is initialized with default empty values', () => {
    const parameterBag = new ParameterBag();

    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  test('that it can be initialized with the contructor', () => {
    const parameterBag = new ParameterBag([], [], {}, {});

    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  test('that two instances do not share data', () => {
    const parameterBag = new ParameterBag();
    const parameterBag2 = new ParameterBag();

    parameterBag.setFilters([{
      field: 'f1',
      value: 'v1',
    }]);

    expect(parameterBag.filters).not.toEqual(parameterBag2.filters);
  });

  test('that it contains setters and getters for filters, paging, sorting and params', () => {
    const parameterBag = new ParameterBag();

    const params: Record<string, unknown> = {
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

    parameterBag.setFilters(filters);
    parameterBag.setParams(params);
    parameterBag.setPaging(paging);
    parameterBag.setSorting(sorting);

    expect(parameterBag.filters).toEqual(filters);
    expect(parameterBag.params).toEqual(params);
    expect(parameterBag.paging).toEqual(paging);
    expect(parameterBag.sorting).toEqual(sorting);

    const extraFilter = {
      field: 'f2',
      value: 'v2',
    };
    filters.push(extraFilter);

    parameterBag.addFilter(extraFilter);
    expect(parameterBag.filters).toEqual(filters);

    params.key3 = 'value3';
    parameterBag.addParam('key3', 'value3');
    expect(parameterBag.params).toEqual(params);
  });

  test('that an attribute is set after setting any parameter', () => {
    const filters = [{ field: 'test', value: 'test' }];
    const sorting = [{ field: 'test' }];
    const paging = { offset: 0, limit: 10 };
    const param = { test: 'test' };
    const params = { test: param };

    const parameterBagSetFilters = new ParameterBag();
    expect(parameterBagSetFilters.filters).toEqual([]);
    parameterBagSetFilters.setFilters(filters);
    expect(parameterBagSetFilters.filters).toEqual(filters);

    const parameterBagAddFilter = new ParameterBag();
    expect(parameterBagAddFilter.filters).toEqual([]);
    parameterBagAddFilter.addFilter(filters[0]);
    expect(parameterBagAddFilter.filters).toEqual(filters);

    const parameterBagSetSorting = new ParameterBag();
    expect(parameterBagSetSorting.sorting).toEqual([]);
    parameterBagSetSorting.setSorting(sorting);
    expect(parameterBagSetSorting.sorting).toEqual([{ field: sorting[0].field, direction: 'asc' }]);

    const parameterBagSetPaging = new ParameterBag();
    expect(parameterBagSetPaging.paging).toEqual({});
    parameterBagSetPaging.setPaging(paging);
    expect(parameterBagSetPaging.paging).toEqual(paging);

    const parameterBagSetParams = new ParameterBag();
    expect(parameterBagSetParams.params).toEqual({});
    parameterBagSetParams.setParams(params);
    expect(parameterBagSetParams.params).toEqual(params);

    const parameterBagAddParam = new ParameterBag();
    expect(parameterBagAddParam.params).toEqual({});
    parameterBagAddParam.addParam(Object.keys(params)[0], param);
    expect(parameterBagAddParam.params).toEqual(params);
  });
});
