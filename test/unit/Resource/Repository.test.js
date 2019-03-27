import createResourceRepository from '../../../src/Resource/RepositoryFactory';

describe('The resource repository', () => {
  const connector = {
    fetch: jest.fn(),
    fetchOne: jest.fn(),
  };
  const resourceType = 'testtype';
  const identifier = 'tid';

  const repository = createResourceRepository(connector, resourceType, identifier);

  it('should have the correct identifier', () => {
    expect(repository.identifier).toBe(identifier);
  });
});
