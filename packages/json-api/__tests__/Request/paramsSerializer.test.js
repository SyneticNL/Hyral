import ParameterBag from '../../../core/src/Resource/ParameterBag';
import paramsSerializer from '../../src/Request/paramsSerializer';
import serializePaging from '../../src/Request/Params/serializePaging';
import serializeFilters from '../../src/Request/Params/serializeFilters';
import serializeParams from '../../src/Request/Params/serializeParams';
import serializeSorting from '../../src/Request/Params/serializeSorting';

describe('paramSerializer', () => {
  test('that serializeParams gives a valid JSON:API response', () => {
    const parameterBag = ParameterBag();
    const params = {
      simple: 'value',
      nested: {
        param: 'value',
      },
    };

    parameterBag.setParams(params);
    expect(serializeParams(parameterBag)).toEqual(params);

    expect(serializeParams({})).toEqual({});
  });

  test('that serializeSorting gives a valid JSON:API response', () => {
    const parameterBag = ParameterBag();
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

    parameterBag.setSorting([]);
    expect(serializeSorting(parameterBag)).toBeNull();
  });

  test('that serializePaging gives a valid JSON:API response', () => {
    const parameterBag = ParameterBag();
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

  test('that serializeFilters gives a valid JSON:API response', () => {
    const parameterBag = ParameterBag();
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

  test('that paramsSerializer gives a valid, JSON:API compatible, params object', () => {
    const parameterBag = ParameterBag();
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

  test('that paramsSerializer gives an empty string when not having passed a ParameterBag', () => {
    expect(paramsSerializer('')).toEqual('');
    expect(paramsSerializer({})).toEqual('');
    expect(paramsSerializer(undefined)).toEqual('');
    expect(paramsSerializer(null)).toEqual('');
    expect(paramsSerializer(0)).toEqual('');
  });
});
