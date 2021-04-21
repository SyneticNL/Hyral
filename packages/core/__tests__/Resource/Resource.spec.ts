import Resource from '../../src/Resource/Resource';

describe('Resource', () => {
  test('that the resource is correctly initialized', () => {
    const resource1 = new Resource(1, 'product');

    expect(resource1.id).toEqual(1);
    expect(resource1.data).toEqual({});
    expect(resource1.relationships).toEqual({});

    const resource2 = new Resource(1, 'product', { test: 'property' });
    expect(resource2.data).toEqual({ test: 'property' });
    expect(resource2.relationships).toEqual({});

    const resource3relationships = {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
    };
    const resource3 = new Resource(1, 'product', { test: 'property' }, resource3relationships);
    expect(resource3.data).toEqual({ test: 'property' });
    expect(resource3.relationships).toEqual(resource3relationships);
  });

  test('that a resource can be created with relationships', () => {
    const author = new Resource(2, 'author', { name: 'A great author' });
    const book = new Resource(1, 'book', {
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
    expect(book.relationships?.author.resource).toEqual('author');
  });

  test('that the relationships for a resource can be updated', () => {
    const book = new Resource(1, 'book', {
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
});
