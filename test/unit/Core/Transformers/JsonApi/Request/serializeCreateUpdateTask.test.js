import serializeCreateUpdateTask from '../../../../../../packages/json-api/src/JsonApi/Request/Serializers/serializeCreateUpdateTask';
import updateRequestPayload from '../../../../../fixtures/JsonApi/Mutations/updateRequestPayload';
import updateRequestWithRelationshipsPayload
  from '../../../../../fixtures/JsonApi/Mutations/updateRequestWithRelationshipsPayload';
import Resource from '../../../../../../packages/core/src/Resource/Resource';
import Task from '../../../../../../packages/core/src/Resource/Change/Task/Task';
import requestSerializer
  from '../../../../../../packages/json-api/src/JsonApi/Request/requestSerializer';
import createJsonPayload
  from '../../../../../fixtures/JsonApi/Mutations/createRequestPayload';

describe('The jsonApi request serializeCreateUpdateTask serializer', () => {
  test('that serializeCreateUpdateTask results in a correct JsonApi request payload for a new resource', () => {
    const repository = {};
    const book = Resource(null, 'book', { title: 'A great book' });
    const task = Task('create', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(createJsonPayload);

    expect(requestSerializer(task)).toEqual(createJsonPayload);
  });

  test('that serializeCreateUpdateTask results in a correct JsonApi request payload', () => {
    const repository = {};
    const book = Resource(1, 'book', { title: 'A great book' });
    const task = Task('update', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(updateRequestPayload);

    expect(requestSerializer(task)).toEqual(updateRequestPayload);
  });

  test('that processCreateTask results in a correct JsonApi request payload for a resource with a changed relation', () => {
    const repository = {};
    const author = Resource(2, 'author', { name: 'A great author' });
    const publications = [
      Resource(3, 'publication', {}),
      Resource(4, 'publication', {}),
    ];

    const book = Resource(1, 'book', {
      title: 'A great book',
      author,
      publications,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
        many: false,
      },
      publications: {
        resource: 'publication',
        cardinality: 'one-to-many',
        many: true,
      },
    });

    const task = Task('update', repository, book);
    const authorTask = Task('relation', repository, { relation: 'author', resources: [author] }, book);
    const publicationTask = Task('relation', repository, { relation: 'publications', resources: publications }, book);
    task.addRelated([
      authorTask,
      publicationTask,
    ]);

    expect(serializeCreateUpdateTask(task)).toEqual(updateRequestWithRelationshipsPayload);
    expect(requestSerializer(task)).toEqual(updateRequestWithRelationshipsPayload);

    expect(authorTask.claimed).toBeTruthy();
    expect(publicationTask.claimed).toBeTruthy();
  });
});
