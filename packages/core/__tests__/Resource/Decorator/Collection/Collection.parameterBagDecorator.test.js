import Collection from '../../../../src/Resource/Collection';

describe('Collection decorator parameterBagDecorator', () => {
  test('that a collection can use the parameterBag proxy methods', () => {
    const newCollection = Collection.create('test');

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

    newCollection.setFilters(filters);
    newCollection.setParams(params);
    newCollection.setPaging(paging);
    newCollection.setSorting(sorting);

    expect(newCollection.stateStack).toHaveLength(5);

    expect(newCollection.filters).toEqual(filters);
    expect(newCollection.parameterBag.filters).toEqual(filters);
    expect(newCollection.params).toEqual(params);
    expect(newCollection.parameterBag.params).toEqual(params);
    expect(newCollection.paging).toEqual(paging);
    expect(newCollection.parameterBag.paging).toEqual(paging);
    expect(newCollection.sorting).toEqual(sorting);
    expect(newCollection.parameterBag.sorting).toEqual(sorting);

    const extraFilter = {
      field: 'f2',
      value: 'v2',
    };
    filters.push(extraFilter);

    newCollection.addFilter(extraFilter);
    expect(newCollection.filters).toEqual(filters);
    expect(newCollection.parameterBag.filters).toEqual(filters);

    params.key3 = 'value3';
    newCollection.addParam('key3', 'value3');
    expect(newCollection.params).toEqual(params);
    expect(newCollection.parameterBag.params).toEqual(params);
  });
});
