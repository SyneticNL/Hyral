import ResourceManager from '../../../../../packages/core/src/Resource/ResourceManager';
import Resource from '../../../../../packages/core/src/Resource/Resource';

describe('The cascaded persist of a resource', () => {
  test('that a task is created for each changed resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();

    const productResource = Resource(1, 'product', { price: 2300 });

    const coverStory = Resource(null, 'text', { text: 'A tale of mystery and wonder.' });
    const book = Resource(1, 'book', {
      title: 'A great book',
      product: productResource,
    }, {
      product: {
        resource: 'product',
        cardinality: 'one-to-one',
        many: false,
      },
      coverStory: {
        resource: 'text',
        cardinality: 'one-to-one',
        many: false,
      },
    });

    book.data = {
      title: 'An even greater book',
      product: productResource,
      coverStory,
    };

    productResource.data = {
      price: 2200,
    };

    ChangeSet.persistCascadeResource(book);

    expect(ChangeSet.tasks).toHaveLength(4);

    expect(ChangeSet.tasks[0].payload).toBe(book);
    expect(ChangeSet.tasks[0].type).toEqual('update');
    expect(ChangeSet.tasks[0].dependencies).toHaveLength(0);
    expect(ChangeSet.tasks[0].related).toHaveLength(1);
    expect(ChangeSet.tasks[0].related[0].type).toEqual('relation');
    expect(ChangeSet.tasks[0].related[0].payload.relation).toEqual('coverStory');
    expect(ChangeSet.tasks[0].related[0].payload.resources[0]).toBe(coverStory);

    expect(ChangeSet.tasks[1].payload.relation).toEqual('coverStory');
    expect(ChangeSet.tasks[1].type).toEqual('relation');
    expect(ChangeSet.tasks[1].related).toHaveLength(0);
    expect(ChangeSet.tasks[1].dependencies).toHaveLength(1);
    expect(ChangeSet.tasks[1].dependencies[0].type).toEqual('create');
    expect(ChangeSet.tasks[1].dependencies[0].payload).toEqual(coverStory);

    expect(ChangeSet.tasks[2].payload).toBe(productResource);
    expect(ChangeSet.tasks[2].type).toEqual('update');
    expect(ChangeSet.tasks[2].related).toHaveLength(0);
    expect(ChangeSet.tasks[2].dependencies).toHaveLength(0);

    expect(ChangeSet.tasks[3].payload).toBe(coverStory);
    expect(ChangeSet.tasks[3].type).toEqual('create');
    expect(ChangeSet.tasks[3].related).toHaveLength(0);
    expect(ChangeSet.tasks[3].dependencies).toHaveLength(0);
  });
});
