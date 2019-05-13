import Task from '../../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../../src/Resource/Resource';
import findTaskByPayload
  from '../../../../../src/Resource/Change/Task/Helpers/findTaskByPayload';

describe('The Task', () => {
  test('That a task can be found by payload', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });
    const resource2 = Resource.create(null, 'product', { title: 'A great product' });
    const resource3 = Resource.create(null, 'product', { title: 'A great product' });

    const resourceTask = Task('create', {}, resource);
    const resource2Task = Task('create', {}, resource2);
    const tasks = [
      resourceTask,
      resource2Task,
    ];

    expect(findTaskByPayload(tasks, resource)).toBe(resourceTask);
    expect(findTaskByPayload(tasks, resource2)).toBe(resource2Task);
    expect(findTaskByPayload(tasks, resource3)).toBeUndefined();
    expect(findTaskByPayload(tasks, {})).toBeUndefined();
    expect(findTaskByPayload(tasks, 0)).toBeUndefined();
    expect(findTaskByPayload(tasks, '')).toBeUndefined();
  });
});
