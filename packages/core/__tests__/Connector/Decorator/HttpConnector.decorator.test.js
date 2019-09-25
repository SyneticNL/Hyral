import HttpConnector from '../../../src/Connector/HttpConnector';
import mockAxios from 'jest-mock-axios';

describe('The HttpConnector decorator', () => {
  const mockDecorator = jest.fn((connector) => connector);
  HttpConnector.decorators.push(mockDecorator);

  it('should have called the decorator', () => {
    const urlSerializer = {
      fetch: jest.fn(),
    };

    const paramsSerializer = jest.fn();
    const requestSerializer = jest.fn();
    const responseNormalizer = jest.fn();

    const connector = HttpConnector.create(
      mockAxios, {
        urlSerializer,
        paramsSerializer,
        requestSerializer,
        responseNormalizer,
      },
    );

    expect(mockDecorator).toHaveBeenCalledWith(connector);
  });
});
