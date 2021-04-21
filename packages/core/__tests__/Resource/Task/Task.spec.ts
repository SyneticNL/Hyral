import Task from '../../../src/Resource/Task/Task';
import Resource from '../../../src/Resource/Resource';

describe('The Task', () => {
  test('That a task can be created', () => {
    const resource = new Resource(null, 'product', { title: 'A great product' });

    const repositoryMock: any = {
      create: jest.fn(() => Promise.resolve({
        data: {
          data: resource,
        },
      })),
    };

    const task = new Task('create', repositoryMock, resource);

    expect(task).toHaveProperty('type');
    expect(task).toHaveProperty('repository');
    expect(task).toHaveProperty('payload');
    expect(task).toHaveProperty('context');
  });
});
