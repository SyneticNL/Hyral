import Task from '../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../src/Resource/Resource';

describe('The Task', () => {
  test('That a task can be created and executed', () => {
    const repositoryMock = {
      create: jest.fn(() => Promise.resolve()),
    };

    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const task = Task('create', repositoryMock, resource);

    expect(task).toHaveProperty('payload');
    expect(task).toHaveProperty('execute');
    expect(task).toHaveProperty('resolved');
    expect(task).toHaveProperty('claimed');

    expect(task.resolved).toBeFalsy();
    expect(task.claimed).toBeFalsy();

    return task.execute().then(() => {
      expect(repositoryMock.create.mock.calls).toHaveLength(1);

      expect(task.resolved).toBeTruthy();
    });
  });
});
