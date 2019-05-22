import Resource from '../../../../src/Resource/Resource';
import createRelationshipsDecorator from '../../../../src/Resource/Decorator/Resource/relationshipsDecorator';

describe('The relationships decorator for a resource', () => {
  test('that the relationships are correctly set from the decorator configuration', () => {
    Resource.decorators.push(createRelationshipsDecorator({
      product: {
        price: {
          cardinality: 'one-to-one',
          many: false,
          resource: 'price',
        },
        author: {
          cardinality: 'one-to-one',
          many: false,
          resource: 'people',
        },
      },
      book: {
        author: {
          cardinality: 'one-to-one',
          many: false,
          resource: 'people',
        },
      },
    }));

    const product = Resource.create(1, 'product');
    const book = Resource.create(1, 'book');
    const author = Resource.create(1, 'author');

    expect(product.relationships).toHaveProperty('price');
    expect(product.relationships).toHaveProperty('author');

    expect(book.relationships).toHaveProperty('author');

    expect(author.relationships).toEqual({});
  });

  test('that the relationships are not overridden from the decorator if defined manually', () => {
    Resource.decorators.push(createRelationshipsDecorator({
      product: {
        price: {
          cardinality: 'one-to-one',
          many: false,
          resource: 'price',
        },
      },
    }));

    const product2Relationships = {
      images: {
        cardinality: 'one-to-many',
        many: true,
        resource: 'image',
      },
    };

    const product = Resource.create(1, 'product', {}, product2Relationships);

    expect(product.relationships).toEqual(product2Relationships);
    expect(product.relationships).not.toHaveProperty('price');
  });
});
