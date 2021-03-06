import Repository from '../../src/Resource/Repository';

describe('The repositoryManager', () => {
  const connectorMock = {};
  const resourceType1 = 'test_product';
  const resourceType2 = 'test_page';
  const identifier = 'id';
  const resource1 = Repository.create(
    connectorMock, resourceType1, identifier,
  );
  const resource2 = Repository.create(
    connectorMock, resourceType2, identifier,
  );

  it('should create two unique instances when called twice.', () => {
    expect(resource1.resourceType).not.toBe(resource2.resourceType);
  });

  it('should have the properties for the connector, resourceType and identifier', () => {
    expect(resource1).toHaveProperty('resourceType');
    expect(resource1).toHaveProperty('identifier');
  });
});
