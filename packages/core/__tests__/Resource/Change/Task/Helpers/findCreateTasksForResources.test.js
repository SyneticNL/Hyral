import Task from '../../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../../src/Resource/Resource';
import findCreateTasksForResources
  from '../../../../../src/Resource/Change/Task/Helpers/findCreateTasksForResources';

describe('The findCreateTasksForResources', () => {
  test('That findCreateTasksForResources returns the create tasks', () => {
    const resource = Resource(null, 'product', { title: 'A great product' });
    const resource2 = Resource(1, 'product', { title: 'A great product' });

    const resourceTask = Task('create', {}, resource);
    const resource2Task = Task('update', {}, resource2);

    const tasks = [
      resourceTask,
      resource2Task,
    ];

    const foundTasks = findCreateTasksForResources(tasks, [resource, resource2]);

    expect(foundTasks).toHaveLength(1);
    expect(foundTasks).toContain(resourceTask);
    expect(foundTasks).not.toContain(resource2Task);
  });
});
