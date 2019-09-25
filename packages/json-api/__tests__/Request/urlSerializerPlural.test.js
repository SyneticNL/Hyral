import urlSerializerPlural from '../../src/Request/urlSerializerPlural';

describe('The JSON:API plural url serializer', () => {
  const repository = {
    resourceType: 'product',
  };

  it('should properly create the url for collections', () => {
    expect(urlSerializerPlural.fetch(repository)).toEqual('/products');
  });
  it('should properly create the url for an entity', () => {
    expect(urlSerializerPlural.fetchOne(repository, 1)).toEqual('/products/1');
  });
  it('should properly create the url for an entity create', () => {
    expect(urlSerializerPlural.create(repository.resourceType)).toEqual('/products');
  });
  it('should properly create the url for an entity update', () => {
    expect(urlSerializerPlural.update(repository.resourceType, 1)).toEqual('/products/1');
  });
  it('should properly create the url for an entity delete', () => {
    expect(urlSerializerPlural.delete(repository.resourceType, 1)).toEqual('/products/1');
  });
  it('should properly create the url for an entity relation', () => {
    expect(urlSerializerPlural.relation(repository.resourceType, 1, { resource: 'store' })).toEqual('/products/1/relationships/store');
  });
});
