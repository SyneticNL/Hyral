import { matchers } from 'jest-json-schema';
import responseNormalizer from '../../../../../src/Core/Transformers/JsonApi/Response/responseNormalizer';
import jsonResponseFixture from '../../../../fixtures/fetchJsonResponse';
import resourceJsonSchema from '../../../../../schema/resource.schema';

expect.extend(matchers);

describe('Validations for the responseNormalizer', () => {
  test('that the responseNormalizer returns a schema-valid array of resources', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toMatchSchema(resourceJsonSchema);
  });

  test('that the responseNormalizer returns the list of relationships', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0]).toHaveProperty('metadata');
    expect(result.data[0]).toHaveProperty('relationships');

    expect(result.data[0].relationships).toHaveProperty('consultant');
    expect(result.data[0].relationships.consultant.resource).toBe('people');
    expect(result.data[0].relationships.consultant.cardinality).toEqual('one-to-many');
    expect(result.data[0].data.consultant).toHaveProperty('id');
    expect(result.data[0].data.consultant).toHaveProperty('type');

    expect(result.data[0].relationships).toHaveProperty('thumbnail');
    expect(result.data[0].relationships.thumbnail.resource).toBe('images');
    expect(result.data[0].relationships.thumbnail.cardinality).toEqual('one-to-many');

    expect(result.data[1].relationships).toHaveProperty('images');
    expect(result.data[1].relationships.images.resource).toBe('images');
    expect(result.data[1].relationships.images.cardinality).toEqual('many-to-many');
    expect(result.data[1].data.images).toHaveLength(2);
    expect(result.data[1].data.images[0]).toHaveProperty('id');
    expect(result.data[1].data.images[0]).toHaveProperty('type');
  });

  test('that the responseNormalizer returns the expected resource with properties as in the fixture data', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0]).toHaveProperty('data');
    expect(result.data[0].type).toEqual('products');
    expect(result.data[0].data).toHaveProperty('title');
    expect(result.data[0].data.title).toEqual('The title');
  });

  test('that the responseNormalizer returns a relation that is not included', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0].data).toHaveProperty('consultant');
    expect(result.data[0].data.consultant).toMatchSchema(resourceJsonSchema);

    expect(result.data[0].data.consultant.metadata.loaded).toBeFalsy();
    expect(result.data[0].data.consultant.metadata.loading).toBeFalsy();
  });

  test('that the responseNormalizer returns a relation that is included', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0].data).toHaveProperty('thumbnail');
    expect(result.data[0].data.thumbnail).toMatchSchema(resourceJsonSchema);

    expect(result.data[0].data.thumbnail.metadata.loaded).toBeTruthy();
    expect(result.data[0].data.thumbnail.metadata.loading).toBeFalsy();
    expect(result.data[0].data.thumbnail.data).toHaveProperty('focusPoint');
  });

  test('that the responseNormalizer returns a many-many relationship', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[1].data).toHaveProperty('images');
    expect(result.data[1].data.images).toHaveLength(2);
    expect(result.data[1].data.images[0]).toMatchSchema(resourceJsonSchema);

    expect(result.data[1].data.images[0].metadata.loaded).toBeTruthy();
    expect(result.data[1].data.images[0].metadata.loading).toBeFalsy();
    expect(result.data[1].data.images[0].data).toHaveProperty('focusPoint');

    expect(result.data[1].data.images[1]).toMatchSchema(resourceJsonSchema);
    expect(result.data[1].data.images[1].metadata.loaded).toBeFalsy();
    expect(result.data[1].data.images[1].metadata.loading).toBeFalsy();
    expect(result.data[1].data.images[1].data).not.toHaveProperty('focusPoint');
  });

  test('that the responseNormalizer returns paging information', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.paging.count).toEqual(100);
    expect(result.paging.pages).toEqual(5);
  });
});
