import mockAxios from 'jest-mock-axios';
import HttpConnector from '../../../../packages/core/src/Connector/HttpConnector';
import cloneDeep from 'lodash/cloneDeep';

describe('The http connector should have all properties necessary', () => {
  const urlSerializer = {
    fetch: jest.fn(),
  };

  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  const connector = HttpConnector(
    mockAxios,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  it('has a fetch method', () => {
    expect(connector).toHaveProperty('fetch');
  });

  it('has a fetchOne method', () => {
    expect(connector).toHaveProperty('fetchOne');
  });

  it('has a create method', () => {
    expect(connector).toHaveProperty('create');
  });

  it('has an update method', () => {
    expect(connector).toHaveProperty('update');
  });

  it('has a delete method', () => {
    expect(connector).toHaveProperty('delete');
  });
});

describe('The fetch method', () => {
  const url = 'url';
  const urlSerializer = {
    fetch: jest.fn(() => url),
  };
  const response = {
    data: {
      key1: 'value1',
    },
  };

  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();
  const axiosMock = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
    get: jest.fn(() => Promise.resolve(response)),
  };
  axiosMock.create = jest.fn(() => axiosMock);

  const connector = HttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const repository = {};
  const parameterBag = {};

  it('should use the urlSerializer correctly', () => {
    connector.fetch(repository, parameterBag);

    expect(urlSerializer.fetch).toHaveBeenCalledTimes(1);
    expect(urlSerializer.fetch).toHaveBeenCalledWith(repository);
    expect(axiosMock.get).toHaveBeenCalledWith(url, { params: parameterBag });
  });

  it('should return the data of the response using a promise', () => {
    return connector.fetch(repository, parameterBag).then((data) => {
      expect(data).toBe(response);
    });
  });
});

describe('The fetchOne method', () => {
  const url = 'url';
  const id = 1;
  const response = {
    data: {
      key1: 'value1',
    },
  };

  const urlSerializer = {
    fetch: jest.fn(),
    fetchOne: jest.fn(() => `${url}/${id}`),
  };
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();
  const axiosMock = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
    get: jest.fn(() => Promise.resolve(response)),
  };
  axiosMock.create = jest.fn(() => axiosMock);

  const connector = HttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const repository = {};
  const parameterBag = {};
  it('should use the urlSerializer and have the expected result', () => {
    connector.fetchOne(repository, id, parameterBag);

    expect(urlSerializer.fetchOne).toHaveBeenCalledTimes(1);
    expect(urlSerializer.fetchOne).toHaveBeenCalledWith(repository, id);
    expect(axiosMock.get).toHaveBeenCalledWith('url/1', { params: parameterBag });
  });

  /* eslint-disable arrow-body-style */
  it('should return the data of the response using a promise', () => {
    return connector.fetchOne(repository, id, parameterBag).then((data) => {
      expect(data).toBe(response);
    });
  });
});

describe('The create http connector should create a objects', () => {
  const urlSerializer1 = jest.fn();
  const urlSerializer2 = jest.fn();
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  const connector1 = HttpConnector(
    mockAxios,
    urlSerializer1,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const connector2 = HttpConnector(
    mockAxios,
    urlSerializer2,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );
  test('connector1 and connector2 should be unique', () => {
    expect(connector1).not.toBe(connector2);
  });
});

describe('The axios instance configuration', () => {
  const urlSerializer = jest.fn();
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  mockAxios.defaults = {
    baseURL: '/test',
    paramsSerializer: null,
    transformResponse: [],
    transformRequest: [],
  };
  mockAxios.create = jest.fn(() => cloneDeep(mockAxios));

  const connector = HttpConnector(
    mockAxios,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  test('that the axios instance configuration is not set globally', () => {
    expect(mockAxios.defaults.paramsSerializer).not.toBe(paramsSerializer);
    expect(mockAxios.defaults.transformResponse).not.toContain(responseNormalizer);
    expect(mockAxios.defaults.transformRequest).not.toContain(requestSerializer);
  });

  test('that the axios instance contains the globally set configuration', () => {
    expect(connector.axios.defaults.baseURL).toEqual('/test');
  });
});
