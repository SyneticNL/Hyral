import mockAxios from 'jest-mock-axios';
import { cloneDeep } from 'lodash';
import HttpConnector from '../../src/Connector/HttpConnector';
import { IParameterBag, IRepository, ITask } from '../../src/__types__';

describe('The http connector should have all properties necessary', () => {
  const axios: any = mockAxios;
  const serializers = {
    urlSerializer: { fetch: jest.fn() },
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer: jest.fn(),
  };

  const connector = new HttpConnector(axios, serializers as any);

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
  const response = {
    data: {
      key1: 'value1',
    },
  };

  const serializers = {
    urlSerializer: { fetch: jest.fn(() => url) },
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer: jest.fn(() => response.data),
  };
  const axiosMock = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
    get: jest.fn(() => Promise.resolve(response)),
    create: () => {},
  };
  axiosMock.create = jest.fn(() => axiosMock);

  const connector = new HttpConnector(axiosMock as any, serializers as any);

  const repository = {} as IRepository<any>;
  const parameterBag = {} as IParameterBag;

  it('should use the urlSerializer correctly', async () => {
    await connector.fetch(repository, parameterBag);

    expect(serializers.urlSerializer.fetch).toHaveBeenCalledTimes(1);
    expect(serializers.urlSerializer.fetch).toHaveBeenCalledWith(repository);
    expect(axiosMock.get).toHaveBeenCalledWith(url, { params: parameterBag });
  });

  it('should return the data of the response using a promise', () => connector.fetch(repository, parameterBag).then((data) => {
    expect(data).toEqual(response);
  }));
});

describe('The fetchOne method', () => {
  const url = 'url';
  const id = 1;
  const response = {
    data: {
      key1: 'value1',
    },
  };

  const serializers = {
    urlSerializer: {
      fetch: jest.fn(),
      fetchOne: jest.fn(() => `${url}/${id}`),
    },
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer: jest.fn(() => response.data),
  };

  const axiosMock = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
    get: jest.fn(() => Promise.resolve(response)),
    create: () => {},
  };
  axiosMock.create = jest.fn(() => axiosMock);

  const connector = new HttpConnector(axiosMock as any, serializers as any);

  const repository = {} as IRepository<any>;
  const parameterBag = {} as IParameterBag;
  it('should use the urlSerializer and have the expected result', async () => {
    await connector.fetchOne(repository, id, parameterBag);

    expect(serializers.urlSerializer.fetchOne).toHaveBeenCalledTimes(1);
    expect(serializers.urlSerializer.fetchOne).toHaveBeenCalledWith(repository, id);
    expect(axiosMock.get).toHaveBeenCalledWith('url/1', { params: parameterBag });
  });

  it('should return the data of the response using a promise',
    () => connector.fetchOne(repository, id, parameterBag).then((data) => {
      expect(data).toEqual(response);
    }));
});

describe('The create/update/delete/relation methods', () => {
  const urlSerializer = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    relation: jest.fn(),
  };

  const serializers = {
    urlSerializer,
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer: jest.fn(),
  };

  const axiosMock = {
    post: jest.fn(() => Promise.resolve()),
    patch: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    defaults: {},
  };

  const connector = new HttpConnector(axiosMock as any, serializers as any);

  const task = {
    payload: {
      type: 'book',
      id: 1,
    },
  };

  connector.create(task as ITask<any>).catch(() => {});
  expect(urlSerializer.create).toHaveBeenCalledWith(task.payload.type);
  expect(serializers.requestSerializer).toHaveBeenCalledWith(task);
  expect(axiosMock.post).toHaveBeenCalled();

  serializers.requestSerializer.mockClear();
  axiosMock.post.mockClear();

  connector.update(task as ITask<any>).catch(() => {});
  expect(urlSerializer.update).toHaveBeenCalledWith(task.payload.type, task.payload.id);
  expect(serializers.requestSerializer).toHaveBeenCalledWith(task);
  expect(axiosMock.patch).toHaveBeenCalled();

  serializers.requestSerializer.mockClear();
  axiosMock.patch.mockClear();

  serializers.requestSerializer.mockClear();
  axiosMock.patch.mockClear();

  connector.delete(task as ITask<any>).catch(() => {});
  expect(urlSerializer.delete).toHaveBeenCalledWith(task.payload.type, task.payload.id);
  expect(axiosMock.delete).toHaveBeenCalled();

  serializers.requestSerializer.mockClear();
  axiosMock.delete.mockClear();
});

describe('The create http connector should create a objects', () => {
  const axios = mockAxios;

  const urlSerializer1 = jest.fn();
  const urlSerializer2 = jest.fn();
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  const serializers1 = {
    urlSerializer: urlSerializer1,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  };

  const serializers2 = {
    urlSerializer: urlSerializer2,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  };
  const connector1 = new HttpConnector(axios as any, serializers1 as any);
  const connector2 = new HttpConnector(axios as any, serializers2 as any);
  test('connector1 and connector2 should be unique', () => {
    expect(connector1).not.toBe(connector2);
  });
});

describe('The axios instance configuration', () => {
  const axios = mockAxios as { defaults: Record<string, any>, create: () => void };
  axios.defaults = {
    baseURL: '/test',
    paramsSerializer: null,
    transformResponse: [],
    transformRequest: [],
  };
  axios.create = jest.fn(() => cloneDeep(mockAxios));

  const serializers = {
    urlSerializer: jest.fn(),
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer: jest.fn(),
  };

  const connector = new HttpConnector(axios as any, serializers as any);
  test('that the axios instance configuration is not set globally', () => {
    expect(axios.defaults).not.toContain(serializers.paramsSerializer);
    expect(axios.defaults.transformResponse).not.toContain(serializers.responseNormalizer);
    expect(axios.defaults.transformRequest).not.toContain(serializers.requestSerializer);
  });

  test('that the axios instance contains the globally set configuration', () => {
    expect(connector.axios.defaults.baseURL).toEqual('/test');
  });

  test('that the axios instance response type configuration defaults to json response type', () => {
    expect(connector.axios.defaults.responseType).toEqual('json');
  });
});

describe('The axios instance response type by responseNormalizer', () => {
  const axios = mockAxios as { defaults: Record<string, any>, create: () => void };
  axios.defaults = {
    baseURL: '/test',
    paramsSerializer: null,
    transformResponse: [],
    transformRequest: [],
  };
  axios.create = jest.fn(() => cloneDeep(mockAxios));

  const responseNormalizer = {
    this: jest.fn(),
    responseType: 'xml',
  };

  const serializers = {
    urlSerializer: jest.fn(),
    paramsSerializer: jest.fn(),
    requestSerializer: jest.fn(),
    responseNormalizer,
  };

  const connector = new HttpConnector(axios as any, serializers as any);

  test('that the axios instance has the xml response type', () => {
    expect(connector.axios.defaults.responseType).toEqual('xml');
  });
});
