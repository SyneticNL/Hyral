// Unsafe member access is logical here because the content of meta and data is up to the user.
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { IResource } from '@hyral/core';
import responseNormalizer from '../../src/Response/responseNormalizer';
import jsonSingleResponseFixture from '../fixtures/fetchJsonSingleResponse.json';

describe('Resource meta for the responseNormalizer', () => {
  test('that the responseNormalizer returns meta information', () => {
    const result = responseNormalizer(jsonSingleResponseFixture as any) as IResource<any>;

    expect(result.data.meta).toHaveProperty('meta-property');
    expect(result.data.meta['meta-property']).toEqual('test-value');

    expect(result.data.data.images[0].meta).toHaveProperty('meta-relationships-property');
    expect(result.data.data.images[0].meta).toHaveProperty('image-meta-property');
    expect(result.data.data.images[0].meta['meta-relationships-property']).toEqual('test-relationships-value');
    expect(result.data.data.images[0].meta['image-meta-property']).toEqual('image-test-value');
  });
});
