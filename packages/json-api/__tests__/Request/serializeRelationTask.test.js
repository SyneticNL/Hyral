import serializeRelationTask
  from '../../src/Request/Serializers/serializeRelationTask';
import Resource from '../../../core/src/Resource/Resource';
import Task from '../../../core/src/Resource/Change/Task/Task';
import requestSerializer
  from '../../src/Request/requestSerializer';
import relationChangeRequestPayload
  from '../fixtures/JsonApi/Mutations/relationChangeRequestPayload';
import relationChangeManyRequestPayload
  from '../fixtures/JsonApi/Mutations/relationChangeManyRequestPayload';
import relationRemoveRequestPayload
  from '../fixtures/JsonApi/Mutations/relationRemoveRequestPayload';

describe('The JSON:API request serializeRelationTask serializer', () => {
  test('that serializeRelationTask skips execution if not passed a valid task', () => {
    const task = {};
    expect(serializeRelationTask(task)).toBe(task);

    const createTask = Task('create', {}, {});
    expect(serializeRelationTask(createTask)).toBe(createTask);
  });

  test('that serializeRelationTask results in a correct JSON:API request payload', () => {
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

    const authorTask = Task('relation', repository, { relation: 'author', resources: [author] }, book);
    const removeAuthorTask = Task('relation', repository, { relation: 'author', resources: [] }, book);
    const publicationTask = Task('relation', repository, { relation: 'publications', resources: publications }, book);

    expect(serializeRelationTask(authorTask)).toEqual(relationChangeRequestPayload);
    expect(requestSerializer(authorTask)).toEqual(relationChangeRequestPayload);

    expect(serializeRelationTask(publicationTask)).toEqual(relationChangeManyRequestPayload);
    expect(requestSerializer(publicationTask)).toEqual(relationChangeManyRequestPayload);

    expect(serializeRelationTask(removeAuthorTask)).toEqual(relationRemoveRequestPayload);
    expect(requestSerializer(removeAuthorTask)).toEqual(relationRemoveRequestPayload);
  });
});
