import Resource from '@hyral/core/lib/Resource/Resource';
import responseNormalizer from '../../src/Response/responseNormalizer';
import jsonSingleResponseFixture from '../fixtures/JsonApi/Fetch/fetchJsonSingleResponse';

describe('Resource meta for the responseNormalizer', () => {
  Resource.decorators = [];

  test('that the responseNormalizer returns meta information', () => {
    const result = responseNormalizer(jsonSingleResponseFixture);

    expect(result.data.meta).toHaveProperty('meta-property');
    expect(result.data.meta['meta-property']).toEqual('test-value');

    expect(result.data.data.images[0].meta).toHaveProperty('meta-relationships-property');
    expect(result.data.data.images[0].meta).toHaveProperty('image-meta-property');
    expect(result.data.data.images[0].meta['meta-relationships-property']).toEqual('test-relationships-value');
    expect(result.data.data.images[0].meta['image-meta-property']).toEqual('image-test-value');
  });
});
