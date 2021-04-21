import urlSerializer from '../../src/Request/urlSerializer';

describe('The JSON:API url serializer', () => {
  const repository = {
    resourceType: 'product',
  };

  it('should properly create the url for collections', () => {
    expect(urlSerializer.fetch(repository as any)).toEqual('/product');
  });
  it('should properly create the url for an entity', () => {
    expect(urlSerializer.fetchOne(repository as any, 1)).toEqual('/product/1');
  });
  it('should properly create the url for an entity create', () => {
    expect(urlSerializer.create(repository.resourceType)).toEqual('/product');
  });
  it('should properly create the url for an entity update', () => {
    expect(urlSerializer.update(repository.resourceType, 1)).toEqual('/product/1');
  });
  it('should properly create the url for an entity delete', () => {
    expect(urlSerializer.delete(repository.resourceType, 1)).toEqual('/product/1');
  });

  // TODO: Relational mutations not implemented
  // it('should properly create the url for an entity relation', () => {
  // expect(urlSerializer.relation(
  //   repository.resourceType,
  //   1,
  //   { resource: 'store' },
  // )).toEqual('/product/1/relationships/store');
  // });
});
