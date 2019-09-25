import serializeCreateUpdateTask from '../../src/Request/Serializers/serializeCreateUpdateTask';
import updateRequestPayload from '../fixtures/JsonApi/Mutations/updateRequestPayload';
import updateRequestWithRelationshipsPayload
  from '../fixtures/JsonApi/Mutations/updateRequestWithRelationshipsPayload';
import Resource from '../../../core/src/Resource/Resource';
import Task from '../../../core/src/Resource/Change/Task/Task';
import requestSerializer
  from '../../src/Request/requestSerializer';
import createJsonPayload
  from '../fixtures/JsonApi/Mutations/createRequestPayload';

describe('The JSON:API request serializeCreateUpdateTask serializer', () => {
  test('that serializeCreateUpdateTask skips execution if not passed a valid task', () => {
    const task = {};
    expect(serializeCreateUpdateTask(task)).toBe(task);

    const relationTask = Task('relation', {}, {});
    expect(serializeCreateUpdateTask(relationTask)).toBe(relationTask);
  });

  test('that serializeCreateUpdateTask results in a correct JSON:API request payload for a new resource', () => {
    const repository = {};
    const book = Resource.create(null, 'book', { title: 'A great book' });
    const task = Task('create', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(createJsonPayload);

    expect(requestSerializer(task)).toEqual(createJsonPayload);
  });

  test('that serializeCreateUpdateTask results in a correct JSON:API request payload', () => {
    const repository = {};
    const book = Resource.create(1, 'book', { title: 'A great book' });
    const task = Task('update', repository, book);

    expect(serializeCreateUpdateTask(task)).toEqual(updateRequestPayload);

    expect(requestSerializer(task)).toEqual(updateRequestPayload);
  });

  test('that processCreateTask results in a correct JSON:API request payload for a resource with a changed relation', () => {
    const repository = {};
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const publications = [
      Resource.create(3, 'publication', {}),
      Resource.create(4, 'publication', {}),
    ];

    const book = Resource.create(1, 'book', {
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
