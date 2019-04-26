import ParameterBag from '../../../src/Resource/ParameterBag';
import { setState } from '../../../src/State/State';

describe('ParameterBag', () => {
  test('that it is initialized with default empty values', () => {
    const parameterBag = ParameterBag();

    expect(parameterBag.filters).toEqual([]);
    expect(parameterBag.paging).toEqual({});
    expect(parameterBag.sorting).toEqual([]);
    expect(parameterBag.params).toEqual({});
  });

  test('that two instances do not share data', () => {
    const parameterBag = ParameterBag();
    const parameterBag2 = ParameterBag();

    parameterBag.setFilters([{
      field: 'f1',
      value: 'v1',
    }]);

    expect(parameterBag.filters).not.toEqual(parameterBag2.filters);
  });

  test('that it contains setters and getters for filters, paging, sorting and params', () => {
    const parameterBag = ParameterBag();

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

  test('that a stateId is set after setting any parameter', () => {
    const parameterBagSetFilters = ParameterBag();
    expect(parameterBagSetFilters.stateId).toEqual(0);
    parameterBagSetFilters.setFilters([]);
    expect(parameterBagSetFilters.stateId).not.toEqual(0);

    const parameterBagAddFilter = ParameterBag();
    expect(parameterBagAddFilter.stateId).toEqual(0);
    parameterBagAddFilter.addFilter({ field: 'test', value: null });
    expect(parameterBagAddFilter.stateId).not.toEqual(0);

    const parameterBagSetPaging = ParameterBag();
    expect(parameterBagSetPaging.stateId).toEqual(0);
    parameterBagSetPaging.setPaging({ offset: 0, limit: 10 });
    expect(parameterBagSetPaging.stateId).not.toEqual(0);

    const parameterBagSetSorting = ParameterBag();
    expect(parameterBagSetSorting.stateId).toEqual(0);
    parameterBagSetSorting.setSorting([]);
    expect(parameterBagSetSorting.stateId).not.toEqual(0);

    const parameterBagSetParams = ParameterBag();
    expect(parameterBagSetParams.stateId).toEqual(0);
    parameterBagSetParams.setParams({});
    expect(parameterBagSetParams.stateId).not.toEqual(0);

    const parameterBagAddParam = ParameterBag();
    expect(parameterBagAddParam.stateId).toEqual(0);
    parameterBagAddParam.addParam('key', 'value');
    expect(parameterBagAddParam.stateId).not.toEqual(0);
  });

  test('that a stateId is changes after multiple calls', () => {
    const parameterBag = ParameterBag();
    expect(parameterBag.stateId).toBe(0);

    parameterBag.setFilters([]);
    expect(parameterBag.stateId).not.toBe(0);

    const currentStateId = parameterBag.stateId;
    parameterBag.setFilters([]);
    expect(parameterBag.stateId).not.toBe(currentStateId);
  });
  test('that the parameterBag state can be retrieved using the state getter and is well formed.', () => {
    const parameterBag = ParameterBag();
    expect(parameterBag.state).toHaveProperty('parameters');
    expect(parameterBag.state.parameters).toHaveProperty('filters');
    expect(parameterBag.state.parameters).toHaveProperty('sorting');
    expect(parameterBag.state.parameters).toHaveProperty('paging');
    expect(parameterBag.state.parameters).toHaveProperty('params');
    expect(parameterBag.state).toHaveProperty('metadata');
    expect(parameterBag.state.metadata).toHaveProperty('stateId');
  });
  test('that the parameterBag state can be set from data', () => {
    const newState = {
      parameters: {
        filters: [
          {
            field: 'f1',
            value: 'v1',
          },
        ],
        sorting: [
          {
            field: 'f1',
            direction: 'asc',
          },
        ],
        paging: {
          offset: 0,
        },
        params: {
          key1: 'value1',
          key2: 'value2',
        },
      },
    };
    const parameterBag = ParameterBag();
    setState(parameterBag.stateStack, newState);

    expect(parameterBag.filters).toEqual(newState.parameters.filters);
    expect(parameterBag.sorting).toEqual(newState.parameters.sorting);
    expect(parameterBag.paging).toEqual(newState.parameters.paging);
    expect(parameterBag.params).toEqual(newState.parameters.params);
    expect(parameterBag.stateId).toEqual(1);
  });
});
