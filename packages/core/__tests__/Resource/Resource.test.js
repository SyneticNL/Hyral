import Resource from '../../src/Resource/Resource';

describe('The Resource', () => {
  test('that the metadata is correctly initialized', () => {
    const resource1 = Resource.create(1, 'product');

    expect(resource1.metadata.loaded).toBeFalsy();
    expect(resource1.metadata.loading).toBeFalsy();

    const resource2 = Resource.create(1, 'product', { test: 'property' });
    expect(resource2.metadata.loaded).toBeTruthy();
    expect(resource2.metadata.loading).toBeFalsy();
  });

  test('that a resource can be created with relationships', () => {
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const book = Resource.create(1, 'book', {
      title: 'A great book',
      author,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
    });

    expect(book.data.title).toEqual('A great book');
    expect(book.data.author).toBe(author);
    expect(book.relationships).toHaveProperty('author');
    expect(book.relationships.author.resource).toEqual('author');
  });

  test('that the relationships for a resource can be updated', () => {
    const book = Resource.create(1, 'book', {
      title: 'A great book',
    });

    book.relationships = {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
    };

    expect(book.relationships).toHaveProperty('author');
    expect(book.relationships.author.resource).toEqual('author');
  });

  test('that a new Resource can be made based on state', () => {
    const resource = Resource.fromState(1, 'book', { data: { title: 'A great book' } });

    expect(resource.data.title).toEqual('A great book');
  });

  test('that a new Resource can be made based on an invalid state', () => {
    const resource = Resource.fromState(1, 'book', {});

    expect(() => resource.data).not.toThrow(TypeError);
    expect(() => resource.relationships).not.toThrow(TypeError);
  });
});
