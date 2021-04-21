// Unsafe member access is logical here because the content of the resource is up to the user.
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import cloneDeep from 'lodash/cloneDeep';
import { IResource } from '@hyral/core';
import responseNormalizer from '../../src/Response/responseNormalizer';
import { IData, IJsonApiResponse } from '../../src/__types__';

import jsonResponseFixture from '../fixtures/fetchJsonResponse.json';
import jsonSingleResponseFixture from '../fixtures/fetchJsonSingleResponse.json';
import jsonRelationResponseFixture from '../fixtures/fetchJsonRelationResponse.json';
import fetchJsonSingleResponseNoIncluded from '../fixtures/fetchJsonSingleResponseNoIncluded.json';

describe('Validations for the responseNormalizer', () => {
  test('that the responseNormalizer returns a schema-valid array of resources with correct relations', () => {
    const result = responseNormalizer(jsonRelationResponseFixture as any) as IResource<IData>;

    expect(result.data).toHaveLength(1);
    expect(result.data[0].data.paragraphs[0].data.referenced[0].data.detail.data.test).toEqual('test detail page');
    expect(result.data[0].data.paragraphs[0].data.referenced[0].data.detail.id).toEqual('45216ae0-fdd5-405b-84dd-c78ef5414444');
  });
  test('that the responseNormalizer returns a schema-valid array of resources', () => {
    const result = responseNormalizer(jsonResponseFixture as any);

    expect(result.data).toHaveLength(2);
  });

  test('that the responseNormalizer returns a single response', () => {
    const result = responseNormalizer(jsonSingleResponseFixture as any) as IResource<IData>;

    expect(result.data).toHaveProperty('meta');
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
    const result = responseNormalizer(fetchJsonSingleResponseNoIncluded as any) as IResource<IData>;

    expect(result.data).toHaveProperty('meta');
    expect(result.data).toHaveProperty('relationships');

    expect(result.data.relationships).toHaveProperty('images');
    expect(result.data.relationships.images.resource).toBe('images');
    expect(result.data.relationships.images.many).toBeTruthy();
    expect(result.data.relationships.images.cardinality).toEqual('one-to-many');
    expect(result.data.data.images).toHaveLength(2);
    expect(result.data.data.images[0]).toHaveProperty('id');
    expect(result.data.data.images[0]).toHaveProperty('type');
  });

  test('that the responseNormalizer returns the list of relationships', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as IResource<IData>;

    expect(result.data[0]).toHaveProperty('meta');
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
    expect(result.data[1].data.images).toHaveLength(3);
    expect(result.data[1].data.images[0]).toHaveProperty('id');
    expect(result.data[1].data.images[0]).toHaveProperty('type');
    expect(result.data[1].data.images[0].type).toEqual('images');
    expect(result.data[1].data.images[1].type).toEqual('images');
    expect(result.data[1].data.images[2].type).toEqual('images-large');
  });

  test('that the responseNormalizer returns the expected resource with properties as in the fixture data', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as IResource<IData>;

    expect(result.data[0]).toHaveProperty('data');
    expect(result.data[0].type).toEqual('products');
    expect(result.data[0].data).toHaveProperty('title');
    expect(result.data[0].data.title).toEqual('The title');
  });

  test('that the responseNormalizer returns a relation that is not included', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as IResource<IData>;

    expect(result.data[0].data).toHaveProperty('consultant');
  });

  test('that the responseNormalizer returns a relation that is included', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as IResource<IData>;

    expect(result.data[0].data).toHaveProperty('thumbnail');
    expect(result.data[0].data.thumbnail.data).toHaveProperty('focusPoint');
  });

  test('that the responseNormalizer returns a many-many relationship', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as IResource<IData>;

    expect(result.data[1].data).toHaveProperty('images');
    expect(result.data[1].data.images).toHaveLength(3);
    expect(result.data[1].data.images[0].data).toHaveProperty('focusPoint');
    expect(result.data[1].data.images[1].data).not.toHaveProperty('focusPoint');
  });

  test('that the responseNormalizer returns paging information', () => {
    const result = responseNormalizer(jsonResponseFixture as any) as {
      data: IResource<IData>[] | IResource<IData>,
      paging: { count: number, pages: number }
    };

    expect(result.paging.count).toEqual(100);
    expect(result.paging.pages).toEqual(5);
  });

  test('that the responseNormalizer no paging information when no last link is present', () => {
    const noLinkJsonResponseFixture: any = cloneDeep(jsonResponseFixture);
    noLinkJsonResponseFixture.links = {};
    const result = responseNormalizer(noLinkJsonResponseFixture) as {
      data: IResource<IData>[] | IResource<IData>,
      paging: { count: number, pages: number }
    };

    expect(result.paging.count).toEqual(0);
    expect(result.paging.pages).toEqual(0);
  });

  test('that the responseNormalizer returns the response on error', () => {
    const errorResponse = { errors: { some: 'error' } } as IJsonApiResponse;
    const result = responseNormalizer(errorResponse);

    expect(result).toBe(errorResponse);
  });

  test('that the responseNormalizer returns the response when there is no data', () => {
    const emptyResponse = { data: null } as IJsonApiResponse;
    const result = responseNormalizer(emptyResponse);

    expect(result).toBe(emptyResponse);
  });
});
