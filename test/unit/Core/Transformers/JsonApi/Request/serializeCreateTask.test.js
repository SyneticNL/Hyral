import serializeCreateTask from '../../../../../../src/Core/Transformers/JsonApi/Request/Serializers/serializeCreateTask';
import createJsonPayload from '../../../../../fixtures/JsonApi/Mutations/createRequestPayload';
import Resource from '../../../../../../src/Core/Resource/Resource';
import Task from '../../../../../../src/Core/Resource/Change/Task/Task';
import requestSerializer
  from '../../../../../../src/Core/Transformers/JsonApi/Request/requestSerializer';

describe('The jsonApi request serializeCreateTask serializer', () => {
  test('that serializeCreateTask results in a correct JsonApi request payload', () => {
    const repository = {};
    const book = Resource(null, 'book', { title: 'A great book' });
    const task = Task('create', repository, book);

    expect(serializeCreateTask(task)).toEqual(createJsonPayload);

    expect(requestSerializer(task)).toEqual(createJsonPayload);
  });
});
