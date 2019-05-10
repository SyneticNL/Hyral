import ResourceManager from '../../../src/Resource/ResourceManager';
import Resource from '../../../src/Resource/Resource';

describe('The ResourceManager ChangeSet', () => {
  test('that a task is created when deleting a resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();

    const existingResource = Resource(1, 'book', { title: 'A great book' });

    ChangeSet.deleteResource(existingResource);

    expect(ChangeSet.tasks).toHaveLength(1);

    expect(ChangeSet.tasks[0].type).toEqual('delete');
    expect(ChangeSet.tasks[0].payload).toBe(existingResource);
  });
});
