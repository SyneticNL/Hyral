import { matchers } from 'jest-json-schema';
import cloneDeep from 'lodash/cloneDeep';
import Resource from '@hyral/core/lib/Resource/Resource';
import createRelationshipsDecorator from '@hyral/core/src/Resource/Decorator/Resource/relationshipsDecorator';
import responseNormalizer from '../../src/Response/responseNormalizer';
import jsonResponseFixture from '../fixtures/JsonApi/Fetch/fetchJsonResponse';
import jsonSingleResponseFixture from '../fixtures/JsonApi/Fetch/fetchJsonSingleResponse';
import fetchJsonSingleResponseNoIncluded from '../fixtures/JsonApi/Fetch/fetchJsonSingleResponseNoIncluded';
import resourceJsonSchema from '../../../core/schema/resource.schema';

expect.extend(matchers);

describe('Validations for the responseNormalizer', () => {
  Resource.decorators = [];

  test('that the responseNormalizer returns a schema-valid array of resources', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toMatchSchema(resourceJsonSchema);
  });

  test('that the responseNormalizer returns a single response', () => {
    const result = responseNormalizer(jsonSingleResponseFixture);

    expect(result.data).toHaveProperty('metadata');
    expect(result.data).toHaveProperty('relationships');

    expect(result.data.relationships).toHaveProperty('images');
    expect(result.data.relationships.images.resource).toBe('images');
    expect(result.data.relationships.images.many).toBeTruthy();
    expect(result.data.relationships.images.cardinality).toEqual('one-to-many');
    expect(result.data.data.images).toHaveLength(2);
    expect(result.data.data.images[0]).toHaveProperty('id');
    expect(result.data.data.images[0]).toHaveProperty('type');
    expect(result.data.data.images[0].data['image.name']).toEqual('list-imago-tracker.jpg');
  });


  test('that the responseNormalizer returns a single response that has no included relationships', () => {
    const result = responseNormalizer(fetchJsonSingleResponseNoIncluded);

    expect(result.data).toHaveProperty('metadata');
    expect(result.data).toHaveProperty('relationships');

    expect(result.data.relationships).toHaveProperty('images');
    expect(result.data.relationships.images.resource).toBe('images');
    expect(result.data.relationships.images.many).toBeTruthy();
    expect(result.data.relationships.images.cardinality).toEqual('one-to-many');
    expect(result.data.data.images).toHaveLength(2);
    expect(result.data.data.images[0]).toHaveProperty('id');
    expect(result.data.data.images[0]).toHaveProperty('type');
    expect(result.data.data.images[0].metadata.loaded).toBeFalsy();
  });

  test('that the responseNormalizer returns the list of relationships', () => {
    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0]).toHaveProperty('metadata');
    expect(result.data[0]).toHaveProperty('relationships');

    expect(result.data[0].relationships).toHaveProperty('consultant');
    expect(result.data[0].relationships.consultant.resource).toBe('people');
    expect(result.data[0].relationships.consultant.many).toBeFalsy();
    expect(result.data[0].relationships.consultant.cardinality).toEqual('many-to-one');
    expect(result.data[0].data.consultant).toHaveProperty('id');
    expect(result.data[0].data.consultant).toHaveProperty('type');

    expect(result.data[0].relationships).toHaveProperty('thumbnail');
    expect(result.data[0].relationships.thumbnail.resource).toBe('images');
    expect(result.data[0].relationships.thumbnail.many).toBeFalsy();
    expect(result.data[0].relationships.thumbnail.cardinality).toEqual('many-to-one');

    expect(result.data[1].relationships).toHaveProperty('images');
    expect(result.data[1].relationships.images.resource).toBe('images');
    expect(result.data[1].relationships.images.many).toBeTruthy();
    expect(result.data[1].relationships.images.cardinality).toEqual('one-to-many');
    expect(result.data[1].data.images).toHaveLength(2);
    expect(result.data[1].data.images[0]).toHaveProperty('id');
    expect(result.data[1].data.images[0]).toHaveProperty('type');
  });

  test('that the responseNormalizer does not overwrite the resource relationships decorator', () => {
    const productsRelationships = {
      consultant: {
        cardinality: 'many-to-one',
        many: false,
        resource: 'people',
      },
      menu_link: {
        cardinality: 'one-to-one',
        many: false,
        resource: 'menulinks',
      },
      thumbnail: {
        cardinality: 'many-to-one',
        many: false,
        resource: 'images',
      },
      images: {
        cardinality: 'one-to-many',
        many: true,
        resource: 'images',
      },
      price: {
        cardinality: 'one-to-many',
        many: true,
        resource: 'prices',
      },
    };
    Resource.decorators.push(createRelationshipsDecorator({
      products: productsRelationships,
    }));

    const result = responseNormalizer(jsonResponseFixture);

    expect(result.data[0]).toHaveProperty('relationships');
    expect(result.data[0].relationships).toEqual(productsRelationships);
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

  test('that the responseNormalizer no paging information when no last link is present', () => {
    const noLinkJsonResponseFixture = cloneDeep(jsonResponseFixture);
    noLinkJsonResponseFixture.links = {};
    const result = responseNormalizer(noLinkJsonResponseFixture);

    expect(result.paging.count).toEqual(0);
    expect(result.paging.pages).toEqual(0);
  });

  test('that the responseNormalizer returns the response on error', () => {
    const errorResponse = { errors: { some: 'error' } };
    const result = responseNormalizer(errorResponse);

    expect(result).toBe(errorResponse);
  });

  test('that the responseNormalizer returns the response when there is no data', () => {
    const emptyResponse = { data: null };
    const result = responseNormalizer(emptyResponse);

    expect(result).toBe(emptyResponse);
  });
});
