import createHttpConnector from '../../../src/Connector/CreateHttpConnector';

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

  const connector1 = createHttpConnector(
    axiosMock1,
    urlSerializer1,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  const connector2 = createHttpConnector(
    axiosMock2,
    urlSerializer2,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );
  test('connector1 and connector2 should be unique', () => {
    expect(connector1.urlSerializer).not.toBe(connector2.urlSerializer);
    expect(connector1.axios).not.toBe(connector2.axios);
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

  const connector = createHttpConnector(
    axiosMock,
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  );

  test('axios has the paramSerializer', () => {
    expect(connector.axios.defaults.paramsSerializer).toBe(paramsSerializer);
  });
  test('the last item in request transformers is the transformer supplied', () => {
    expect(connector.axios.defaults.transformRequest.slice(-1)[0]).toBe(requestSerializer);
  });
  test('the last item in response transformers is the normalizer supplied', () => {
    expect(connector.axios.defaults.transformResponse.slice(-1)[0]).toBe(responseNormalizer);
  });
});
