import Task from '../../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../../src/Resource/Resource';
import filterExistingDependencies
  from '../../../../../src/Resource/Change/Task/Helpers/filterExistingDependencies';

describe('The filterExistingDependencies', () => {
  test('That filterExistingDependencies returns only not previously added dependencies', () => {
    const author = Resource(null, 'author', { title: 'A great author' });
    const text = Resource(null, 'text', { title: 'About' });
    const resource = Resource(null, 'product', { title: 'A great product' });

    const authorTask = Task('create', {}, author);
    const textTask = Task('create', {}, text);
    const resourceTask = Task('update', {}, resource);

    resourceTask.addDependencies([authorTask]);

    const foundTasks = filterExistingDependencies(resourceTask, [authorTask, textTask]);

    expect(foundTasks).toHaveLength(1);
    expect(foundTasks).toContain(textTask);
    expect(foundTasks).not.toContain(authorTask);
  });
});
