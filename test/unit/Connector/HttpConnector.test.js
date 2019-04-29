import HttpConnector from '../../../src/Connector/HttpConnector';

describe('The http connector should have all properties necessary', () => {
  const urlSerializer = {
    fetch: jest.fn(),
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
  };

  const connector = HttpConnector(
    axiosMock,
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

  const connector = HttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const repository = {};
  const parameterBag = {};

  connector.fetch(repository, parameterBag);
  it('should use the urlSerializer once', () => {
    expect(urlSerializer.fetch.mock.calls.length).toBe(1);
  });
  it('the urlSerializer should be called with the repository', () => {
    expect(urlSerializer.fetch.mock.calls[0][0]).toBe(repository);
  });
  it('should use the reponse of the urlSerializer as input for axios get', () => {
    expect(axiosMock.get.mock.calls[0][0]).toBe(url);
  });
  it('should call axios get with the parameter bag as input for the params object', () => {
    expect(axiosMock.get.mock.calls[0][1].params).toBe(parameterBag);
  });
  /* eslint-disable arrow-body-style */
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

  const connector = HttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const repository = {};
  const parameterBag = {};
  connector.fetchOne(repository, id, parameterBag);

  it('should use the urlSerializer once', () => {
    expect(urlSerializer.fetchOne.mock.calls.length).toBe(1);
  });
  it('the urlSerializer should be called with the repository and the id', () => {
    expect(urlSerializer.fetchOne.mock.calls[0][0]).toBe(repository);
    expect(urlSerializer.fetchOne.mock.calls[0][1]).toBe(id);
  });
  it('should use the reponse of the urlSerializer as input for axios get', () => {
    expect(axiosMock.get.mock.calls[0][0]).toBe('url/1');
  });
  it('should call axios get with the parameter bag as input for the params object', () => {
    expect(axiosMock.get.mock.calls[0][1].params).toBe(parameterBag);
  });
  /* eslint-disable arrow-body-style */
  it('should return the data of the response using a promise', () => {
    return connector.fetchOne(repository, id, parameterBag).then((data) => {
      expect(data).toBe(response);
    });
  });
});

describe('The create http connector should create a objects', () => {
  const axiosMock1 = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
  };
  const axiosMock2 = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
  };
  const urlSerializer1 = jest.fn();
  const urlSerializer2 = jest.fn();
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  const connector1 = HttpConnector(
    axiosMock1,
    urlSerializer1,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const connector2 = HttpConnector(
    axiosMock2,
    urlSerializer2,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );
  test('connector1 and connector2 should be unique', () => {
    expect(connector1).not.toBe(connector2);
  });
});

describe('The axios instance is properly configured', () => {
  const axiosMock = {
    defaults: {
      paramsSerializer: null,
      transformRequest: [],
      transformResponse: [],
    },
  };
  const urlSerializer = jest.fn();
  const paramsSerializer = jest.fn();
  const requestSerializer = jest.fn();
  const responseNormalizer = jest.fn();

  HttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  test('axios has the paramSerializer', () => {
    expect(axiosMock.defaults.paramsSerializer).toBe(paramsSerializer);
  });
  test('the last item in request transformers is the transformer supplied', () => {
    expect(axiosMock.defaults.transformRequest.slice(-1)[0]).toBe(requestSerializer);
  });
  test('the last item in response transformers is the normalizer supplied', () => {
    expect(axiosMock.defaults.transformResponse.slice(-1)[0]).toBe(responseNormalizer);
  });
});
