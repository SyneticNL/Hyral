import createResourceRepository from '../../../src/Resource/RepositoryFactory';
import ParameterBag from '../../../src/Resource/ParameterBag';

describe('The resource repository', () => {
  const resourceType = 'testtype';
  const identifier = 'tid';
  const parameterBag = new ParameterBag();

  let repository;
  let connector;

  const responseData = [
    {
      data: 'data',
    },
    {
      data: 'data',
    },
  ];

  beforeEach(() => {
    connector = {
      fetch: jest.fn(() => Promise.resolve(responseData)),
      fetchOne: jest.fn(() => Promise.resolve(responseData)),
    };
    repository = createResourceRepository(connector, resourceType, identifier);
  });

  it('should have the correct identifier and resource type after the creation', () => {
    expect(repository.identifier).toBe(identifier);
    expect(repository.resourceType).toBe(resourceType);
  });

  it('should default the id to "id" when the id is omitted in the factory', () => {
    repository = createResourceRepository(connector, resourceType);
    expect(repository.identifier).toBe('id');
  });

  it('should have the immutable properties resourceType and identifier after creation', () => {
    expect(() => { repository.resourceType = 'new'; }).toThrow(TypeError);
    expect(() => { repository.identifier = 'otherid'; }).toThrow(TypeError);
  });

  it('should use the connector fetch once for the find method to do requests.', () => {
    repository.find(parameterBag);
    expect(connector.fetch.mock.calls.length).toBe(1);
  });
  it('should use the connector fetch once for the findOne method to do requests.', () => {
    repository.find(parameterBag);
    expect(connector.fetch.mock.calls.length).toBe(1);
  });
  it('should use the connector fetchOne once for the findById method to do requests.', () => {
    repository.find(parameterBag);
    expect(connector.fetch.mock.calls.length).toBe(1);
  });
  /* eslint-disable arrow-body-style */
  it('should return the promise of the connector after a find containing the data array', () => {
    return repository.find(parameterBag).then((data) => {
      expect(data).toBe(responseData);
    });
  });
  /* eslint-disable arrow-body-style */
  it('should return the promise of the connector after a findOne containing the first element of the data array', () => {
    return repository.findOne(parameterBag).then((data) => {
      expect(data).toBe(responseData[0]);
    });
  });
  it('should return the promise of the connector after a findById containing the data', () => {
    return repository.findById(1).then((data) => {
      expect(data).toBe(responseData);
    });
  });
});
