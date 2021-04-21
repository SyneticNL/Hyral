import repositoryManager from '../../src/Resource/repositoryManager';

describe('The resource factory', () => {
  const connectorMock: any = {};
  const resourceType1 = 'test_product';
  const resourceType2 = 'test_page';
  const resourceType3 = 'test_article';
  const identifier = 'id';
  const resource1 = repositoryManager.createRepository(connectorMock, resourceType1, identifier);
  const resource2 = repositoryManager.createRepository(connectorMock, resourceType2, identifier);
  const resource3 = repositoryManager.createRepository(connectorMock, resourceType3);

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
    expect(repositoryManager.getRepository(resourceType1)).toBe(resource1);
    expect(repositoryManager.getRepository(resourceType2)).toBe(resource2);

    const repositories = repositoryManager.getRepositories();
    expect(repositories[resourceType1]).toBe(resource1);
    expect(repositories[resourceType2]).toBe(resource2);
  });

  test('that we cannot add a second repository of the same type', () => {
    const connectorMock1: any = {
      urlSerializer: 'test1',
    };
    const connectorMock2: any = {
      urlSerializer: 'test2',
    };

    repositoryManager.createRepository(connectorMock1, 'testtype3', identifier);
    repositoryManager.createRepository(connectorMock2, 'testtype3', identifier);

    expect(repositoryManager.getRepository('testtype3')?.connector).toBe(connectorMock1);
  });
});
