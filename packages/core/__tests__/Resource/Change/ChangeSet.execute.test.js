import ResourceManager from '../../../src/Resource/ResourceManager';
import Resource from '../../../src/Resource/Resource';

describe('The ResourceManager execute method', () => {
  test('that all tasks are executed when calling the execute method', () => {
    const connector = {
      update: jest.fn(() => Promise.resolve()),
      relation: jest.fn(() => Promise.resolve()),
    };

    ResourceManager.createRepository(connector, 'book');
    ResourceManager.createRepository(connector, 'author');

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

    expect(ChangeSet.tasks).toHaveLength(2);

    return ChangeSet.execute().then(() => {
      expect(ChangeSet.tasks.filter(task => task.resolved)).toHaveLength(ChangeSet.tasks.length);
    });
  });
});
