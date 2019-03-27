import urlSerializer from '../../../../src/Transformers/JsonApi/urlSerializer';

describe('The jsonApi url serializer', () => {
  const repository = {
    resourceType: 'product',
  };

  it('should properly create the url for collections', () => {
    expect(urlSerializer.fetch(repository)).toEqual('/product');
  });
  it('should properly create the url for an entity', () => {
    expect(urlSerializer.fetchOne(repository, 1)).toEqual('/product/1');
  });
  it('should properly create the url for an entity create', () => {
    expect(urlSerializer.create(repository)).toEqual('/product');
  });
  it('should properly create the url for an entity update', () => {
    expect(urlSerializer.update(repository, 1)).toEqual('/product/1');
  });
  it('should properly create the url for an entity delete', () => {
    expect(urlSerializer.delete(repository, 1)).toEqual('/product/1');
  });
});
