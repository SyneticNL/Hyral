import HttpConnector from '../../src/Connector/HttpConnector';

it('Checks that the HttpConnector has a fetch method', () => {
  expect(HttpConnector).toHaveProperty("fetch");
});
