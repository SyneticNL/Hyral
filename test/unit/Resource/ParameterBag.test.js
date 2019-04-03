import ParameterBag from '../../../src/Resource/ParameterBag';

describe('The ParameterBag', () => {
  test('that it is initialized with default empty values', () => {
    const parameterBag = new ParameterBag();

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

  test('that the inner variables are not writable', () => {
    const parameterBag = new ParameterBag();

    expect(() => {
      parameterBag.parameters = {};
    }).toThrow(TypeError);

    expect(() => {
      parameterBag.filters = [];
    }).toThrow(TypeError);

    expect(() => {
      parameterBag.sorting = [];
    }).toThrow(TypeError);

    expect(() => {
      parameterBag.paging = {};
    }).toThrow(TypeError);

    expect(() => {
      parameterBag.params = [];
    }).toThrow(TypeError);
  });

  test('that it contains setters and getters for filters, paging, sorting and params', () => {
    const parameterBag = new ParameterBag();

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

    parameterBag.setFilters(filters);
    parameterBag.setParams(params);
    parameterBag.setPaging(paging);
    parameterBag.setSorting(sorting);

    expect(parameterBag.filters).toBe(filters);
    expect(parameterBag.params).toBe(params);
    expect(parameterBag.paging).toBe(paging);
    expect(parameterBag.sorting).toBe(sorting);

    const extraFilter = {
      field: 'f2',
      value: 'v2',
    };
    filters.push(extraFilter);

    parameterBag.addFilter(extraFilter);
    expect(parameterBag.filters).toBe(filters);

    params.key3 = 'value3';
    parameterBag.addParam('key3', 'value3');
    expect(parameterBag.params).toBe(params);
  });

  test('that a stateId is set after setting any parameter', () => {
    const parameterBagSetFilters = new ParameterBag();
    expect(parameterBagSetFilters.stateId).toBe(0);
    parameterBagSetFilters.setFilters([]);
    expect(parameterBagSetFilters.stateId).not.toBe(0);

    const parameterBagAddFilter = new ParameterBag();
    expect(parameterBagAddFilter.stateId).toBe(0);
    parameterBagAddFilter.addFilter({ field: 'test', value: null });
    expect(parameterBagAddFilter.stateId).not.toBe(0);

    const parameterBagSetPaging = new ParameterBag();
    expect(parameterBagSetPaging.stateId).toBe(0);
    parameterBagSetPaging.setPaging({ offset: 0, limit: 10 });
    expect(parameterBagSetPaging.stateId).not.toBe(0);

    const parameterBagSetSorting = new ParameterBag();
    expect(parameterBagSetSorting.stateId).toBe(0);
    parameterBagSetSorting.setSorting([]);
    expect(parameterBagSetSorting.stateId).not.toBe(0);

    const parameterBagSetParams = new ParameterBag();
    expect(parameterBagSetParams.stateId).toBe(0);
    parameterBagSetParams.setParams({});
    expect(parameterBagSetParams.stateId).not.toBe(0);

    const parameterBagAddParam = new ParameterBag();
    expect(parameterBagAddParam.stateId).toBe(0);
    parameterBagAddParam.addParam('key', 'value');
    expect(parameterBagAddParam.stateId).not.toBe(0);
  });

  test('that a stateId is changes after multiple calls', () => {
    const parameterBag = new ParameterBag();
    expect(parameterBag.stateId).toBe(0);

    parameterBag.setFilters([]);
    expect(parameterBag.stateId).not.toBe(0);

    const currentStateId = parameterBag.stateId;
    parameterBag.setFilters([]);
    expect(parameterBag.stateId).not.toBe(currentStateId);
  });

  it('should have a clone method.', () => {
    const filters = [
      {
        field: 'original',
        value: 'test',
      },
    ];
    const params = {
      original: 'original',
    };
    const original = new ParameterBag();
    original.setFilters(filters);
    original.setParams(params);
    const clone = original.clone();
    clone.addFilter({
      field: 'clone',
      value: 'test',
    });
    clone.addParam('clone', 'clone');
    expect(clone).not.toBe(original);
    expect(clone.filters).not.toEqual(original.filters);
    expect(clone.params).not.toEqual(original.params);
  });
});
