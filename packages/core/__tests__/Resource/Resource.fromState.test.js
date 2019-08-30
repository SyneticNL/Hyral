import Resource from '../../src/Resource/Resource';

describe('Resource.fromState functionality', () => {
  test('that a new Resource can be made based on state', () => {
    const resource = Resource.fromState(1, 'book', { data: { title: 'A great book' } });

    expect(resource.data.title).toEqual('A great book');
  });

  test('that the metadata is correctly initialized from state', () => {
    const resource = Resource.fromState(1, 'product', { id: 1, type: 'product' });
    expect(resource.metadata.loaded).toBeFalsy();
    expect(resource.metadata.loading).toBeFalsy();
  });

  test('that a new Resource can be made based on an invalid state', () => {
    const resource = Resource.fromState(1, 'book', {});

    expect(() => resource.data).not.toThrow(TypeError);
    expect(() => resource.relationships).not.toThrow(TypeError);
  });

  test('that a new Resource can be remade based on an existing state', () => {
    const resource = Resource.create(1, 'book',
      {
        title: 'A great book',
        images: [
          Resource.create(2, 'images', { file: 'image-1.png' }),
          Resource.create(3, 'images-large', { file: 'image-2-large.png' }),
        ]
      },
      {
        images: {
          cardinality: 'one-to-many',
          resource: 'images',
          many: true,
        },
      },
    );

    const state = resource.state;
    const recreatedResource = Resource.fromState(resource.id, resource.type, state);

    expect(recreatedResource.id).toEqual(1);
    expect(recreatedResource.type).toEqual('book');
    expect(recreatedResource.data.title).toEqual('A great book');
    expect(recreatedResource.data.images).toHaveLength(2);
    expect(recreatedResource.data.images[0].id).toEqual(2);
    expect(recreatedResource.data.images[0].type).toEqual('images');
    expect(recreatedResource.data.images[1].id).toEqual(3);
    expect(recreatedResource.data.images[1].type).toEqual('images-large');
  });

  test('that a new resource can be made with relationships from state', () => {
    const state = {
      id: 2,
      data: {
        title: 'John\'s biography',
        author: {
          type: 'people',
          state: {
            id: 1,
            data: {
              name: 'John',
              authorImage: {
                type: 'image',
                state: {
                  id: 5,
                  data: {
                    src: 'image.jpg',
                  },
                  relationships: {},
                  meta: {},
                },
              },
            },
            relationships: {
              authorImage: {
                cardinality: 'many-to-one',
                resource: 'authorImage',
              },
            },
            meta: {},
          }
        },
        publication: [
          {
            type: 'publication',
            state: {
              id: 3,
              data: {
                name: 'Publication 1',
              },
              relationships: {},
              meta: {},
            },
          },
          {
            type: 'publication',
            state: {
              id: 4,
              data: {
                name: 'Publication 2',
              },
              relationships: {},
              meta: {},
            },
          },
        ],
        coAuthor: null,
      },
      relationships: {
        author: {
          cardinality: 'many-to-one',
          resource: 'author',
        },
        publication: {
          cardinality: 'one-to-many',
          resource: 'publication',
          many: true,
        },
        coAuthor: {
          cardinality: 'many-to-one',
          resource: 'author',
        },
      },
      meta: {},
    };

    const resource = Resource.fromState(1, 'book', state);

    expect(() => resource.data).not.toThrow(TypeError);
    expect(() => resource.relationships).not.toThrow(TypeError);
    expect(resource.data.author).toHaveProperty('setMetadata');
    expect(resource.data.author.data.authorImage).toHaveProperty('setMetadata');
    expect(resource.data.publication[0].data.name).toEqual('Publication 1');
    expect(resource.data.publication[0]).toHaveProperty('setMetadata');
    expect(resource.data.publication[1].data.name).toEqual('Publication 2');
    expect(resource.data.publication[1]).toHaveProperty('setMetadata');
    expect(resource.data.coAuthor).toEqual(null);
  });
});
