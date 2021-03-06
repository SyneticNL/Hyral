import Resource from '../../src/Resource/Resource';

describe('The Resource', () => {
  test('that the metadata is correctly initialized', () => {
    const resource1 = Resource.create(1, 'product');

    expect(resource1.id).toEqual(1);
    expect(resource1.metadata.loaded).toBeFalsy();
    expect(resource1.metadata.loading).toBeFalsy();
    expect(resource1.data).toEqual({});
    expect(resource1.relationships).toEqual({});

    expect(resource1.state.data).toEqual({});
    expect(resource1.state.meta).toEqual({});
    expect(resource1.state.relationships).toEqual({});

    const resource2 = Resource.create(1, 'product', { test: 'property' });
    expect(resource2.metadata.loaded).toBeTruthy();
    expect(resource2.metadata.loading).toBeFalsy();
    expect(resource2.data).toEqual({ test: 'property' });
    expect(resource2.relationships).toEqual({});

    const resource3relationships = {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
    };
    const resource3 = Resource.create(1, 'product', { test: 'property' }, resource3relationships);
    expect(resource3.metadata.loaded).toBeTruthy();
    expect(resource3.metadata.loading).toBeFalsy();
    expect(resource3.data).toEqual({ test: 'property' });
    expect(resource3.relationships).toEqual(resource3relationships);
    expect(resource3.state.data).toEqual({ author: null, test: 'property' });
    expect(resource3.state.relationships).toEqual(resource3relationships);


    const resource4 = Resource.create(null, 'product');
    expect(resource4.id).toBeNull();
    expect(resource4.type).toEqual('product');
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
});
