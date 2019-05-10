import Resource from '../../../../packages/core/src/Resource/Resource';

describe('The Resource', () => {
  test('that a resource can be created with relationships', () => {
    const author = Resource(2, 'author', { name: 'A great author' });
    const book = Resource(1, 'book', {
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
