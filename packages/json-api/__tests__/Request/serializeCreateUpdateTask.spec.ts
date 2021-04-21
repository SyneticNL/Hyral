import { Resource, Task } from '@hyral/core';
import serializeCreateUpdateTask from '../../src/Request/Serializers/serializeCreateUpdateTask';
import requestSerializer from '../../src/Request/requestSerializer';
import createJsonPayload from '../fixtures/createRequestPayload.json';
import updateRequestPayload from '../fixtures/updateRequestPayload.json';
// TODO: Disabled because not implemented
// const updateRequestWithRelationshipsPayload = require('../fixtures/updateRequestWithRelationshipsPayload');

describe('The JSON:API request serializeCreateUpdateTask serializer', () => {
  test('that serializeCreateUpdateTask results in a correct JSON:API request payload for a new resource', () => {
    const repository: any = {};
    const book = new Resource(null, 'book', { title: 'A great book' });
    const task: any = new Task('create', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(createJsonPayload);
    expect(requestSerializer(task)).toEqual(createJsonPayload);
  });

  test('that serializeCreateUpdateTask results in a correct JSON:API request payload', () => {
    const repository: any = {};
    const book = new Resource(1, 'book', { title: 'A great book' });
    const task: any = new Task('update', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(updateRequestPayload);
    expect(requestSerializer(task)).toEqual(updateRequestPayload);
  });

  // TODO: Relationships not implemented
  // test('that processCreateTask results in a correct JSON:API request payload for a resource with a changed relation', () => {
  //   const repository: any = {};
  //   const author = new Resource(2, 'author', { name: 'A great author' });
  //   const publications = [
  //     new Resource(3, 'publication', {}),
  //     new Resource(4, 'publication', {}),
  //   ];

  //   const book = new Resource(1, 'book', {
  //     title: 'A great book',
  //     author,
  //     publications,
  //   }, {
  //     author: {
  //       resource: 'author',
  //       cardinality: 'many-to-one',
  //       many: false,
  //     },
  //     publications: {
  //       resource: 'publication',
  //       cardinality: 'one-to-many',
  //       many: true,
  //     },
  //   });

  //   const task = new Task('update', repository, book);
  //   const authorTask = new Task('relation', repository, { relation: 'author', resources: [author] }, book);
  //   const publicationTask = new Task('relation', repository, { relation: 'publications', resources: publications }, book);
  //   task.addRelated([
  //     authorTask,
  //     publicationTask,
  //   ]);

  //   expect(serializeCreateUpdateTask(task)).toEqual(updateRequestWithRelationshipsPayload);
  //   expect(requestSerializer(task)).toEqual(updateRequestWithRelationshipsPayload);

  //   expect(authorTask.claimed).toBeTruthy();
  //   expect(publicationTask.claimed).toBeTruthy();
  // });
});
