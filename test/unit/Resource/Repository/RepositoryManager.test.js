import RepositoryManager
  from '../../../../src/Resource/Repository/RepositoryManager';

describe('The resource factory', () => {
  const connectorMock = {};
  const resourceType1 = 'test_product';
  const resourceType2 = 'test_page';
  const resourceType3 = 'test_article';
  const identifier = 'id';
  const resource1 = RepositoryManager.createRepository(connectorMock, resourceType1, identifier);
  const resource2 = RepositoryManager.createRepository(connectorMock, resourceType2, identifier);
  const resource3 = RepositoryManager.createRepository(connectorMock, resourceType3);

  it('should create two unique instances when called twice.', () => {
    expect(resource1.resourceType).not.toBe(resource2.resourceType);
  });

  it('should have the properties for the connector, resourceType and identifier', () => {
    expect(resource1).toHaveProperty('resourceType');
    expect(resource1).toHaveProperty('identifier');
  });

  it('should have a default identifier of "id"', () => {
    expect(resource3.identifier).toEqual('id');
  });

  test('that we can retrieve the repositories after they have been registered', () => {
    expect(RepositoryManager.getRepository(resourceType1)).toBe(resource1);
    expect(RepositoryManager.getRepository(resourceType2)).toBe(resource2);

    const repositories = RepositoryManager.getRepositories();
    expect(repositories[resourceType1]).toBe(resource1);
    expect(repositories[resourceType2]).toBe(resource2);
  });
});
