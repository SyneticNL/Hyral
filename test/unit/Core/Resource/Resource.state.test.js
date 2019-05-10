import Resource from '../../../../src/Core/Resource/Resource';

describe('The Resource state', () => {
  test('that a resource state can be updated', () => {
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

    book.data = {
      title: 'An even greater book',
      author,
    };

    expect(book.data.title).toEqual('An even greater book');
    expect(book.data.author).toBe(author);
    expect(book.stateStack).toHaveLength(2);
  });

  test('that a resource change maintains the original resource relationships', () => {
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

    book.data = {
      title: 'An even greater book',
      author,
    };

    author.data = {
      name: 'An even greater author',
    };

    expect(book.data.author).toBe(author);
    expect(book.data.author.data.name).toEqual('An even greater author');
  });

});
