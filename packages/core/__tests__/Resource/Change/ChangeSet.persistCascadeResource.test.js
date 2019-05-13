import Resource from '../../../src/Resource/Resource';
import ChangeSet from '../../../src/Resource/Change/ChangeSet';

describe('The cascaded persist of a resource', () => {
  /**
   * Task relation schema for this test
   *
   * d: dependency
   * r: related
   *
   *
   *         <--- [0: Book] --->
   *       /                    \
   *      d                      r
   *     /                        \
   * [3: coverStory(c)] <- d <- [1: coverStory(r)]
   *     ||    |    \
   *     ||    |     ------->-------\
   *     d     \                    r
   *     ||     ----<-- d --<-\     |
   *     \/                   |     |
   * [5: image (c)] <- d <- [4: image (r)]
   */
  test('that a task is created for each changed resource', () => {
    const set = ChangeSet.create();

    const productResource = Resource.create(1, 'product', { price: 2300 });
    const image = Resource.create(null, 'image', { src: 'some/image.png' });

    const coverStory = Resource.create(null, 'text', {
      text: 'A tale of mystery and wonder.',
      image,
    }, {
      image: {
        cardinality: 'many-to-one',
        many: false,
        resource: 'image',
      },
    });

    const book = Resource.create(1, 'book', {
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

    set.persistCascadeResource(book);

    expect(set.tasks).toHaveLength(6);

    expect(set.tasks[0].payload).toBe(book);
    expect(set.tasks[0].type).toEqual('update');
    expect(set.tasks[0].related).toHaveLength(1);
    expect(set.tasks[0].dependencies).toHaveLength(1);
    expect(set.tasks[0].dependencies[0].type).toEqual('create');
    expect(set.tasks[0].dependencies[0].payload).toEqual(coverStory);
    expect(set.tasks[0].related[0].type).toEqual('relation');
    expect(set.tasks[0].related[0].payload.relation).toEqual('coverStory');
    expect(set.tasks[0].related[0].payload.resources[0]).toBe(coverStory);

    expect(set.tasks[1].payload.relation).toEqual('coverStory');
    expect(set.tasks[1].type).toEqual('relation');
    expect(set.tasks[1].related).toHaveLength(0);
    expect(set.tasks[1].dependencies).toHaveLength(1);
    expect(set.tasks[1].dependencies[0].type).toEqual('create');
    expect(set.tasks[1].dependencies[0].payload).toEqual(coverStory);

    expect(set.tasks[2].payload).toBe(productResource);
    expect(set.tasks[2].type).toEqual('update');
    expect(set.tasks[2].related).toHaveLength(0);
    expect(set.tasks[2].dependencies).toHaveLength(0);

    expect(set.tasks[3].payload).toBe(coverStory);
    expect(set.tasks[3].type).toEqual('create');
    expect(set.tasks[3].related).toHaveLength(1);
    expect(set.tasks[3].related[0].type).toEqual('relation');
    expect(set.tasks[3].related[0].payload.relation).toEqual('image');
    expect(set.tasks[3].related[0].payload.resources[0]).toBe(image);
    expect(set.tasks[3].dependencies).toHaveLength(1);
    expect(set.tasks[3].dependencies[0].type).toEqual('create');
    expect(set.tasks[3].dependencies[0].payload).toEqual(image);

    expect(set.tasks[4].context).toBe(coverStory);
    expect(set.tasks[4].type).toEqual('relation');
    expect(set.tasks[4].dependencies).toHaveLength(2);
    expect(set.tasks[4].dependencies[0].type).toEqual('create');
    expect(set.tasks[4].dependencies[0].payload).toEqual(coverStory);
    expect(set.tasks[4].dependencies[1].type).toEqual('create');
    expect(set.tasks[4].dependencies[1].payload).toEqual(image);
    expect(set.tasks[4].related).toHaveLength(0);

    expect(set.tasks[5].payload).toBe(image);
    expect(set.tasks[5].type).toEqual('create');
    expect(set.tasks[5].related).toHaveLength(0);
    expect(set.tasks[5].dependencies).toHaveLength(0);
  });
});
