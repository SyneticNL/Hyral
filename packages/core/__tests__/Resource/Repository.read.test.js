import resourceManager from '../../src/Resource/resourceManager';
import ParameterBag from '../../src/Resource/ParameterBag';

describe('The resource repository', () => {
  const axiosResponseData = {
    data: {
      data: [
        {
          id: 1,
          title: 'test',
        },
      ],
      paging: {
        count: 0,
        pages: 0,
      },
    },
    status: 200,
    statusText: 'OK',
  };

  const identifier = 'tid';
  const connector = {
    fetch: jest.fn(() => Promise.resolve(axiosResponseData)),
    fetchOne: jest.fn(() => Promise.resolve({ data: { data: axiosResponseData.data.data[0] } })),
  };

  it('should have the correct identifier and resource type after the creation', () => {
    const repository = resourceManager.createRepository({}, 'testtype', identifier);
    expect(repository.identifier).toBe(identifier);
    expect(repository.resourceType).toBe('testtype');
  });

  it('should default the id to "id" when the id is omitted in the factory', () => {
    const repository = resourceManager.createRepository({}, 'testtype2');
    expect(repository.identifier).toEqual('id');
  });

  it('should have the immutable properties resourceType and identifier after creation', () => {
    const repository = resourceManager.createRepository({}, 'testtype3', identifier);
    expect(() => { repository.resourceType = 'new'; }).toThrow(TypeError);
    expect(() => { repository.identifier = 'otherid'; }).toThrow(TypeError);
  });

  it('should use the connector fetch once for the find method to do requests.', () => {
    const connectorFind = {
      fetch: jest.fn(() => Promise.resolve(axiosResponseData)),
    };
    const repository = resourceManager.createRepository(connectorFind, 'testtype4', identifier);
    repository.find(ParameterBag());
    expect(connectorFind.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a find containing the data array', () => {
    const repository = resourceManager.createRepository(connector, 'testtype7', identifier);
    return repository.find(ParameterBag()).then((data) => {
      expect(data).toBe(axiosResponseData.data);
    });
  });

  it('should use the connector fetch once for the findOne method to do requests.', () => {
    const connectorFindOne = {
      fetch: jest.fn(() => Promise.resolve(axiosResponseData)),
    };
    const repository = resourceManager.createRepository(connectorFindOne, 'testtype5', identifier);
    repository.findOne(ParameterBag());
    expect(connectorFindOne.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a findOne containing the first element of the data array', () => {
    const repository = resourceManager.createRepository(connector, 'testtype8', identifier);
    return repository.findOne(ParameterBag()).then((data) => {
      expect(data).toEqual(axiosResponseData.data.data[0]);
    });
  });

  it('should use the connector fetchOne once for the findById method to do requests.', () => {
    const connectorFindById = {
      fetchOne: jest.fn(() => Promise.resolve(axiosResponseData.data)),
    };
    const repository = resourceManager.createRepository(connectorFindById, 'testtype6', identifier);
    repository.findById(1);
    expect(connectorFindById.fetchOne.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a findById containing the data', () => {
    const repository = resourceManager.createRepository(connector, 'testtype9', identifier);
    return repository.findById(1).then((data) => {
      expect(data).toBe(axiosResponseData.data.data[0]);
    });
  });
});
