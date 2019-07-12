import Task from '../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../src/Resource/Resource';

describe('The Task', () => {
  test('That a task can be created and executed', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const repositoryMock = {
      create: jest.fn(() => Promise.resolve({
        data: {
          data: resource,
        },
      })),
    };

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

  test('That a task will first execute its dependencies on execute', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const repositoryMock = {
      create: jest.fn(() => Promise.resolve({
        data: {
          data: resource,
        },
      })),
    };

    const dependency = {
      execute: jest.fn(() => Promise.resolve()),
    };
    const task = Task('create', repositoryMock, resource);

    task.addDependencies([dependency]);

    return task.execute().then(() => {
      expect(dependency.execute).toHaveBeenCalled();
    });
  });

  test('That a rejection of a dependency will result in the task reject', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const repositoryMock = {
      create: jest.fn(() => Promise.resolve()),
    };

    const dependency = {
      execute: jest.fn(() => Promise.reject()),
    };
    const task = Task('create', repositoryMock, resource);

    task.addDependencies([dependency]);

    expect.assertions(1);
    return task.execute().catch(() => {
      expect(dependency.execute).toHaveBeenCalled();
    });
  });

  test('That a executing a task twice will result in the same promise', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const repositoryMock = {
      create: jest.fn(() => Promise.resolve({
        data: {
          data: resource,
        },
      })),
    };
    const task = Task('create', repositoryMock, resource);

    const promise = task.execute();

    expect(promise).toBe(task.execute());
  });

  test('That a executing a task that has been claimed will not result in actual execution', () => {
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const repositoryMock = {
      create: jest.fn(() => Promise.resolve({
        data: {
          data: resource,
        },
      })),
    };

    const task = Task('create', repositoryMock, resource);

    task.claim();
    task.claim = jest.fn();

    return task.execute().then(() => {
      expect(task.claim).not.toHaveBeenCalled();
    });
  });
});
