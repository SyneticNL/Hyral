import Resource from '../../../src/Resource/Resource';
import ChangeSet from '../../../src/Resource/Change/ChangeSet';

describe('The persisting of a single resource', () => {
  test('that a task is not created for an unchanged resource', () => {
    const set = ChangeSet.create();
    const existingResource = Resource.create(1, 'book', { title: 'A great book' });

    set.persistResource(existingResource);

    expect(set.tasks).toHaveLength(0);
  });

  test('that a task is created for a new resource', () => {
    const set = ChangeSet.create();
    const existingResource = Resource.create(null, 'book', { title: 'A great book' });

    set.persistResource(existingResource);

    expect(set.tasks).toHaveLength(1);
  });

  test('that a task is created for an existing and changed resource', () => {
    const set = ChangeSet.create();
    const existingResource = Resource.create(1, 'book', { title: 'A great book' });

    existingResource.data = { title: 'An even greater book' };
    set.persistResource(existingResource);

    expect(set.tasks).toHaveLength(1);
  });
});

describe('The persisting of a single resource relationships', () => {
  const set = ChangeSet.create();
  const existingResource = Resource.create(1, 'book', {
    title: 'A great book',
    author: Resource.create(1, 'author', { name: 'A great author' }),
  }, {
    author: {
      resource: 'author',
      cardinality: 'many-to-one',
      many: false,
    },
  });

  existingResource.data = {
    title: 'A great book',
    author: Resource.create(2, 'author', { name: 'An even greater author' }),
  };
  set.persistResource(existingResource);

  test('that a task is created for a changed relationship', () => {
    expect(set.tasks).toHaveLength(2);

    expect(set.tasks[0].payload).toBe(existingResource);
    expect(set.tasks[0].type).toEqual('update');
    expect(set.tasks[1].payload.relation).toEqual('author');
    expect(set.tasks[1].context).toBe(existingResource);
    expect(set.tasks[1].type).toEqual('relation');
  });

  test('that the main resource task lists the relation tasks as related tasks', () => {
    expect(set.tasks[0].related).toHaveLength(1);
    expect(set.tasks[0].related[0]).toBe(set.tasks[1]);
  });

  test('that no duplicate tasks are added when calling persistResource twice', () => {
    expect(set.tasks).toHaveLength(2);

    set.persistResource(existingResource);

    expect(set.tasks).toHaveLength(2);
  });
});
