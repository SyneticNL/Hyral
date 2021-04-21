import jsonapi from '../src';
import jsonApiParamsSerializer from '../src/Request/paramsSerializer';
import jsonApiRequestSerializer from '../src/Request/requestSerializer';
import jsonApiUrlSerializer from '../src/Request/urlSerializer';
import jsonApiResponseNormalizer from '../src/Response/responseNormalizer';

describe('the json-api index', () => {
  test('that json-api exports the correct features', () => {
    expect(jsonapi).toEqual(expect.objectContaining({
      paramsSerializer: jsonApiParamsSerializer,
      responseNormalizer: jsonApiResponseNormalizer,
      requestSerializer: jsonApiRequestSerializer,
      urlSerializer: jsonApiUrlSerializer,
    }));
  });
});
