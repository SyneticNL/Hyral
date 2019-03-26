import createHttpConnector from '../../src/Connector/CreateHttpConnector';

describe('The http connector should have all properties necessary', () => {
  const urlSerializer = jest.fn();
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

  const connector = createHttpConnector(
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
    expect(connector).toHaveProperty('fetch');
  });

  it('has an axios instance', () => {
    expect(connector).toHaveProperty('axios');
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
