import repositoryManager from '../../src/Resource/repositoryManager';
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
    const repository = repositoryManager.createRepository({}, 'testtype', identifier);
    expect(repository.identifier).toBe(identifier);
    expect(repository.resourceType).toBe('testtype');
  });

  it('should default the id to "id" when the id is omitted in the factory', () => {
    const repository = repositoryManager.createRepository({}, 'testtype2');
    expect(repository.identifier).toEqual('id');
  });

  it('should have the immutable properties resourceType and identifier after creation', () => {
    const repository = repositoryManager.createRepository({}, 'testtype3', identifier);
    expect(() => { repository.resourceType = 'new'; }).toThrow(TypeError);
    expect(() => { repository.identifier = 'otherid'; }).toThrow(TypeError);
  });

  it('should use the connector fetch once for the find method to do requests.', () => {
    const connectorFind = {
      fetch: jest.fn(() => Promise.resolve(axiosResponseData)),
    };
    const repository = repositoryManager.createRepository(connectorFind, 'testtype4', identifier);
    repository.find(ParameterBag());
    expect(connectorFind.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a find containing the data array', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype5', identifier);
    return repository.find(ParameterBag()).then((data) => {
      expect(data).toBe(axiosResponseData.data);
    });
  });

  it('should use the connector fetch once for the findOne method to do requests.', () => {
    const connectorFindOne = {
      fetch: jest.fn(() => Promise.resolve(axiosResponseData)),
    };
    const repository = repositoryManager.createRepository(connectorFindOne, 'testtype6', identifier);
    repository.findOne(ParameterBag());
    expect(connectorFindOne.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a findOne containing the first element of the data array', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype7', identifier);
    return repository.findOne(ParameterBag()).then((data) => {
      expect(data).toEqual(axiosResponseData.data.data[0]);
    });
  });

  it('should use the connector fetchOne once for the findById method to do requests.', () => {
    const connectorFindById = {
      fetchOne: jest.fn(() => Promise.resolve(axiosResponseData.data)),
    };
    const repository = repositoryManager.createRepository(connectorFindById, 'testtype8', identifier);
    repository.findById(1);
    expect(connectorFindById.fetchOne.mock.calls).toHaveLength(1);
  });

  it('should resolve to null for findOne when the connector does not give a response.', () => {
    const connectorNullTest = {
      fetch: jest.fn(() => Promise.resolve(null)),
    };
    const repository = repositoryManager.createRepository(connectorNullTest, 'testtype9', identifier);
    return repository.findOne(ParameterBag()).then((response) => {
      expect(response).toBeNull();
    });
  });

  it('should resolve to null for findById when the connector does not give a response.', () => {
    const connectorNullTest = {
      fetchOne: jest.fn(() => Promise.resolve(null)),
    };
    const repository = repositoryManager.createRepository(connectorNullTest, 'testtype10', identifier);
    return repository.findById(1).then((response) => {
      expect(response).toBeNull();
    });
  });

  it('should return the promise of the connector after a findById containing the data', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype11', identifier);
    return repository.findById(1).then((data) => {
      expect(data).toBe(axiosResponseData.data.data[0]);
    });
  });

  it('should allow a parameter bag in the connector for the findById method to do requests', () => {
    const connectorFindOne = {
      fetchOne: jest.fn(() => Promise.resolve(axiosResponseData)),
    };
    const repository = repositoryManager.createRepository(connectorFindOne, 'testtype12', identifier);
    const parameterBag = ParameterBag();
    parameterBag.addParam('include', 'relation1,relation2');

    repository.findById(12, parameterBag);

    expect(connectorFindOne.fetchOne).toHaveBeenCalledTimes(1);
    expect(connectorFindOne.fetchOne).toHaveBeenCalledWith(repository, 12, parameterBag);
  });
});
