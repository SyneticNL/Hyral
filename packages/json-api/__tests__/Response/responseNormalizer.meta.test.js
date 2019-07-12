import Resource from '@hyral/core/lib/Resource/Resource';
import responseNormalizer from '../../src/Response/responseNormalizer';
import jsonSingleResponseFixture from '../fixtures/JsonApi/Fetch/fetchJsonSingleResponse';

describe('Resource meta for the responseNormalizer', () => {
  Resource.decorators = [];

  test('that the responseNormalizer returns a single response', () => {
    const result = responseNormalizer(jsonSingleResponseFixture);

    expect(result.data.meta).toHaveProperty('meta-property');
    expect(result.data.meta['meta-property']).toEqual('test-value');
  });
});
