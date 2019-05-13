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
    expect(book.relationships.author.resource).toEqual('author');
  });
});
