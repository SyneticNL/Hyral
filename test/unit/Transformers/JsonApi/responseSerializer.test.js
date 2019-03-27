import { matchers } from 'jest-json-schema';
import responseNormalizer from '../../../../src/Transformers/JsonApi/responseNormalizer';
import jsonResponseFixture from '../../../fixtures/fetchJsonResponse';
import resourceJsonSchema from '../../../../schema/resource.schema';

expect.extend(matchers);

describe('Validations for the responseNormalizer', () => {
  test('that the responseNormalizer returns a schema-valid array of resources', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result).toHaveLength(2);

    expect(resourceJsonSchema).toBeValidSchema();
    expect(result[0]).toMatchSchema(resourceJsonSchema);
  });

  test('that the responseNormalizer returns the list of relationships', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result[0]).toHaveProperty('metadata');
    expect(result[0].metadata).toHaveProperty('relationships');

    expect(result[0].metadata.relationships).toHaveProperty('consultant');
    expect(result[0].metadata.relationships.consultant.type).toBe('people');
    expect(result[0].metadata.relationships.consultant.isMany).toBeFalsy();
    expect(result[0].metadata.relationships.consultant.data).toHaveProperty('id');
    expect(result[0].metadata.relationships.consultant.data).toHaveProperty('type');

    expect(result[0].metadata.relationships).toHaveProperty('thumbnail');
    expect(result[0].metadata.relationships.thumbnail.type).toBe('images');
    expect(result[0].metadata.relationships.thumbnail.isMany).toBeFalsy();

    expect(result[1].metadata.relationships).toHaveProperty('images');
    expect(result[1].metadata.relationships.images.isMany).toBeTruthy();
    expect(result[1].metadata.relationships.images.type).toBe('images');
    expect(result[1].metadata.relationships.images.data).toHaveLength(2);
    expect(result[1].metadata.relationships.images.data[0]).toHaveProperty('id');
    expect(result[1].metadata.relationships.images.data[0]).toHaveProperty('type');
  });

  test('that the responseNormalizer returns the expected resource with properties as in the fixture data', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result[0]).toHaveProperty('data');
    expect(result[0].type).toEqual('products');
    expect(result[0].data).toHaveProperty('title');
    expect(result[0].data.title).toEqual('The title');
  });

  test('that the responseNormalizer returns an relation that is not included', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result[0].data).toHaveProperty('consultant');
    expect(result[0].data.consultant).toMatchSchema(resourceJsonSchema);

    expect(result[0].data.consultant.metadata.loaded).toBeFalsy();
    expect(result[0].data.consultant.metadata.loading).toBeFalsy();
  });

  test('that the responseNormalizer returns an relation that is included', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result[0].data).toHaveProperty('thumbnail');
    expect(result[0].data.thumbnail).toMatchSchema(resourceJsonSchema);

    expect(result[0].data.thumbnail.metadata.loaded).toBeTruthy();
    expect(result[0].data.thumbnail.metadata.loading).toBeFalsy();
    expect(result[0].data.thumbnail.data).toHaveProperty('focusPoint');
  });

  test('that the responseNormalizer returns a many-many relationship', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result[1].data).toHaveProperty('images');
    expect(result[1].data.images).toHaveLength(2);
    expect(result[1].data.images[0]).toMatchSchema(resourceJsonSchema);

    expect(result[1].data.images[0].metadata.loaded).toBeTruthy();
    expect(result[1].data.images[0].metadata.loading).toBeFalsy();
    expect(result[1].data.images[0].data).toHaveProperty('focusPoint');

    expect(result[1].data.images[1]).toMatchSchema(resourceJsonSchema);
    expect(result[1].data.images[1].metadata.loaded).toBeFalsy();
    expect(result[1].data.images[1].metadata.loading).toBeFalsy();
    expect(result[1].data.images[1].data).not.toHaveProperty('focusPoint');
  });
});