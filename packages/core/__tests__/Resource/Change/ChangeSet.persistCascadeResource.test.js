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
    const thumb = Resource.create('2', 'image', { src: 'some/image2.png' });
    const author = Resource.create(2, 'person', { name: 'A great author' });

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
      thumb,
      author,
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
      thumb: {
        cardinality: 'one-to-one',
        many: false,
        resource: 'image',
      },
      author: {
        cardinality: 'many-to-one',
        many: false,
        resource: 'person',
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

    expect(set.tasks).toHaveLength(9);

    expect(set.tasks[0].payload).toBe(book);
    expect(set.tasks[0].type).toEqual('update');
    expect(set.tasks[0].related).toHaveLength(3);
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

    expect(set.tasks[2].context).toBe(book);
    expect(set.tasks[2].type).toEqual('relation');
    expect(set.tasks[2].dependencies).toHaveLength(0);
    expect(set.tasks[2].related).toHaveLength(0);
    expect(set.tasks[2].payload.relation).toEqual('thumb');
    expect(set.tasks[2].payload.resources).toHaveLength(0);

    expect(set.tasks[3].context).toBe(book);
    expect(set.tasks[3].type).toEqual('relation');
    expect(set.tasks[3].dependencies).toHaveLength(0);
    expect(set.tasks[3].related).toHaveLength(0);
    expect(set.tasks[3].payload.relation).toEqual('author');
    expect(set.tasks[3].payload.resources).toHaveLength(0);

    expect(set.tasks[4].payload).toBe(productResource);
    expect(set.tasks[4].type).toEqual('update');
    expect(set.tasks[4].related).toHaveLength(0);
    expect(set.tasks[4].dependencies).toHaveLength(0);

    expect(set.tasks[5].payload).toBe(coverStory);
    expect(set.tasks[5].type).toEqual('create');
    expect(set.tasks[5].related).toHaveLength(1);
    expect(set.tasks[5].related[0].type).toEqual('relation');
    expect(set.tasks[5].related[0].payload.relation).toEqual('image');
    expect(set.tasks[5].related[0].payload.resources[0]).toBe(image);
    expect(set.tasks[5].dependencies).toHaveLength(1);
    expect(set.tasks[5].dependencies[0].type).toEqual('create');
    expect(set.tasks[5].dependencies[0].payload).toEqual(image);

    expect(set.tasks[6].context).toBe(coverStory);
    expect(set.tasks[6].type).toEqual('relation');
    expect(set.tasks[6].dependencies).toHaveLength(2);
    expect(set.tasks[6].dependencies[0].type).toEqual('create');
    expect(set.tasks[6].dependencies[0].payload).toEqual(coverStory);
    expect(set.tasks[6].dependencies[1].type).toEqual('create');
    expect(set.tasks[6].dependencies[1].payload).toEqual(image);
    expect(set.tasks[6].related).toHaveLength(0);

    expect(set.tasks[7].payload).toBe(image);
    expect(set.tasks[7].type).toEqual('create');
    expect(set.tasks[7].related).toHaveLength(0);
    expect(set.tasks[7].dependencies).toHaveLength(0);

    expect(set.tasks[8].payload).toBe(thumb);
    expect(set.tasks[8].type).toEqual('delete');
    expect(set.tasks[8].related).toHaveLength(0);
    expect(set.tasks[8].dependencies).toHaveLength(0);
  });
});
