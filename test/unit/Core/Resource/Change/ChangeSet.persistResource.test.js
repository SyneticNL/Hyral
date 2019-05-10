import ResourceManager from '../../../../../packages/core/src/Resource/ResourceManager';
import Resource from '../../../../../packages/core/src/Resource/Resource';

describe('The persisting of a single resource', () => {
  test('that a task is not created for an unchanged resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();
    const existingResource = Resource(1, 'book', { title: 'A great book' });

    ChangeSet.persistResource(existingResource);

    expect(ChangeSet.tasks).toHaveLength(0);
  });

  test('that a task is created for a new resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();
    const existingResource = Resource(null, 'book', { title: 'A great book' });

    ChangeSet.persistResource(existingResource);

    expect(ChangeSet.tasks).toHaveLength(1);
  });

  test('that a task is created for an existing and changed resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();
    const existingResource = Resource(1, 'book', { title: 'A great book' });

    existingResource.data = { title: 'An even greater book' };
    ChangeSet.persistResource(existingResource);

    expect(ChangeSet.tasks).toHaveLength(1);
  });
});

describe('The persisting of a single resource relationships', () => {
  const ChangeSet = ResourceManager.createChangeSet();
  const existingResource = Resource(1, 'book', {
    title: 'A great book',
    author: Resource(1, 'author', { name: 'A great author' }),
  }, {
    author: {
      resource: 'author',
      cardinality: 'many-to-one',
      many: false,
    },
  });

  existingResource.data = {
    title: 'A great book',
    author: Resource(2, 'author', { name: 'An even greater author' }),
  };
  ChangeSet.persistResource(existingResource);

  test('that a task is created for a changed relationship', () => {
    expect(ChangeSet.tasks).toHaveLength(2);

    expect(ChangeSet.tasks[0].payload).toBe(existingResource);
    expect(ChangeSet.tasks[0].type).toEqual('update');
    expect(ChangeSet.tasks[1].payload.relation).toEqual('author');
    expect(ChangeSet.tasks[1].context).toBe(existingResource);
    expect(ChangeSet.tasks[1].type).toEqual('relation');
  });

  test('that the main resource task lists the relation tasks as related tasks', () => {
    expect(ChangeSet.tasks[0].related).toHaveLength(1);
    expect(ChangeSet.tasks[0].related[0]).toBe(ChangeSet.tasks[1]);
  });

  test('that no duplicate tasks are added when calling persistResource twice', () => {
    expect(ChangeSet.tasks).toHaveLength(2);

    ChangeSet.persistResource(existingResource);

    expect(ChangeSet.tasks).toHaveLength(2);
  });
});
