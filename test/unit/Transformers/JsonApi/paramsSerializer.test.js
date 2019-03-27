import ParameterBag from '../../../../src/Resource/ParameterBag';
import paramsSerializer from '../../../../src/Transformers/JsonApi/paramsSerializer';
import serializePaging from '../../../../src/Transformers/JsonApi/params/serializePaging';
import serializeFilters from '../../../../src/Transformers/JsonApi/params/serializeFilters';
import serializeParams from '../../../../src/Transformers/JsonApi/params/serializeParams';
import serializeSorting from '../../../../src/Transformers/JsonApi/params/serializeSorting';

describe('paramSerializer', () => {
  test('that serializeParams gives a valid JsonApi response', () => {
    const parameterBag = new ParameterBag();
    const params = {
      simple: 'value',
      nested: {
        param: 'value',
      },
    };

    parameterBag.setParams(params);

    const result = serializeParams(parameterBag);
    expect(result).toEqual(params);
  });

  test('that serializeSorting gives a valid JsonApi response', () => {
    const parameterBag = new ParameterBag();
    parameterBag.setSorting([
      {
        field: 'field1',
        direction: 'asc',
      },
      {
        field: 'field2',
      },
      {
        field: 'field3',
        direction: 'desc',
      },
    ]);

    const result = serializeSorting(parameterBag);
    expect(result).toEqual({
      sort: 'field1,field2,-field3',
    });
  });

  test('that serializePaging gives a valid JsonApi response', () => {
    const parameterBag = new ParameterBag();
    const paging = {
      offset: 20,
      limit: 20,
    };

    parameterBag.setPaging(paging);

    const result = serializePaging(parameterBag);
    expect(result).toEqual({
      page: paging,
    });
  });

  test('that serializeFilters gives a valid JsonApi response', () => {
    const parameterBag = new ParameterBag();
    const filters = [
      {
        field: 'f1',
        value: 'v1',
      },
      {
        field: 'f2',
        value: 'v2',
      },
    ];

    parameterBag.setFilters(filters);

    const result = serializeFilters(parameterBag);
    expect(result).toEqual({
      filter: {
        f1: 'v1',
        f2: 'v2',
      },
    });
  });

  test('that paramsSerializer gives a valid, JsonApi compatible, params object', () => {
    const parameterBag = new ParameterBag();
    parameterBag.setSorting([
      {
        field: 'field1',
      },
      {
        field: 'field2',
        direction: 'desc',
      },
    ]);
    parameterBag.setParams({
      simple: 'value',
    });
    parameterBag.setFilters([
      {
        field: 'f1',
        value: 'v1',
      },
    ]);
    parameterBag.setPaging({
      offset: 20,
      limit: 20,
    });

    const result = paramsSerializer(parameterBag);
    expect(result).toEqual(
      'filter%5Bf1%5D=v1&page%5Boffset%5D=20&page%5Blimit%5D=20&sort=field1%2C-field2&simple=value',
    );
  });

});
