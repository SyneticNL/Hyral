import createResourceRepository from '../../../src/Resource/RepositoryFactory';

describe('The resource factory', () => {
  const connectorMock = {};
  const resourceType1 = 'text_product';
  const resourceType2 = 'text_page';
  const identifier = 'id';
  const resource1 = createResourceRepository(connectorMock, resourceType1, identifier);
  const resource2 = createResourceRepository(connectorMock, resourceType2, identifier);

  it('should create two unique instances when called twice.', () => {
    expect(resource1.resourceType).not.toBe(resource2.resourceType);
  });

  it('should have the properties for the connector, resourceType and identifier', () => {
    expect(resource1).toHaveProperty('connector');
    expect(resource1).toHaveProperty('resourceType');
    expect(resource1).toHaveProperty('identifier');
  });
});
