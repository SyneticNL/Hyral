import Resource from '../../src/Resource/Resource';

describe('The Resource state', () => {
  test('that a resource state can be updated', () => {
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

    book.data = {
      title: 'An even greater book',
      author,
    };

    expect(book.data.title).toEqual('An even greater book');
    expect(book.data.author).toBe(author);
    expect(book.stateStack).toHaveLength(2);
  });

  test('that a resource change maintains the original resource relationships', () => {
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

  test('Test that serialization of a resource state works', () => {
    const authorImage = Resource.create(5, 'authorImage', { src: 'image.jpg' });
    const publication1 = Resource.create(3, 'publication', { name: 'Publication 1'});
    const publication2 = Resource.create(4, 'publication', { name: 'Publication 2'});

    const author = Resource.create(1, 'author', {
      name: 'John',
      authorImage,
    }, {
      authorImage: {
        cardinality: 'many-to-one',
        resource: 'authorImage',
      },
    });

    const book = Resource.create(2, 'book', {
      title: 'John\'s biography',
      author,
      publication: [
        publication1,
        publication2,
      ],
    }, {
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
    });

    expect(book.state.data.author).not.toBe(author);
    expect(book.state.data.author).not.toHaveProperty('setMetadata');
    expect(book.state.data.author).toEqual({ state: author.state, type: author.type });

    expect(book.state.data.author.state.data.authorImage).not.toBe(authorImage);
    expect(book.state.data.author.state.data.authorImage).not.toHaveProperty('setMetadata');
    expect(book.state.data.author.state.data.authorImage).toEqual({ state: authorImage.state, type: authorImage.type });

    expect(book.state.data.publication[0]).not.toBe(publication1);
    expect(book.state.data.publication[0]).not.toHaveProperty('setMetadata');
    expect(book.state.data.publication[0]).toEqual({ state: publication1.state, type: publication1.type });
  });

});
