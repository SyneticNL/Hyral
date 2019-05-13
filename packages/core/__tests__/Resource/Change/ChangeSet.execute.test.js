import repositoryManager from '../../../src/Resource/repositoryManager';
import Resource from '../../../src/Resource/Resource';
import ChangeSet from '../../../src/Resource/Change/ChangeSet';

describe('The ChangeSet execute method', () => {
  test('that all tasks are executed when calling the execute method', () => {
    const connector = {
      update: jest.fn(() => Promise.resolve()),
      relation: jest.fn(() => Promise.resolve()),
    };

    repositoryManager.createRepository(connector, 'book');
    repositoryManager.createRepository(connector, 'author');

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

    expect(set.tasks).toHaveLength(2);

    return set.execute().then(() => {
      expect(set.tasks.filter(task => task.resolved)).toHaveLength(set.tasks.length);
    });
  });
});
