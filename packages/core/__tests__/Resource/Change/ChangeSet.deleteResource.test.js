import Resource from '../../../src/Resource/Resource';
import ChangeSet from '../../../src/Resource/Change/ChangeSet';

describe('The ChangeSet delete method', () => {
  test('that a task is created when deleting a resource', () => {
    const set = ChangeSet.create();

    const existingResource = Resource.create(1, 'book', { title: 'A great book' });

    set.deleteResource(existingResource);

    expect(set.tasks).toHaveLength(1);

    expect(set.tasks[0].type).toEqual('delete');
    expect(set.tasks[0].payload).toBe(existingResource);
  });
});
