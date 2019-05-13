import Task from '../../../../../src/Resource/Change/Task/Task';
import Resource from '../../../../../src/Resource/Resource';
import filterNewDependencyTasks
  from '../../../../../src/Resource/Change/Task/Helpers/filterNewDependencyTasks';

describe('The filterNewDependencyTasks', () => {
  test('That filterNewDependencyTasks returns only not previously added dependencies', () => {
    const author = Resource.create(null, 'author', { title: 'A great author' });
    const text = Resource.create(null, 'text', { title: 'About' });
    const resource = Resource.create(null, 'product', { title: 'A great product' });

    const authorTask = Task('create', {}, author);
    const textTask = Task('create', {}, text);
    const resourceTask = Task('update', {}, resource);

    resourceTask.addDependencies([authorTask]);

    const foundTasks = filterNewDependencyTasks(resourceTask, [authorTask, textTask]);

    expect(foundTasks).toHaveLength(1);
    expect(foundTasks).toContain(textTask);
    expect(foundTasks).not.toContain(authorTask);
  });
});
