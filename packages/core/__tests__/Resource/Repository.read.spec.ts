import repositoryManager from '../../src/Resource/repositoryManager';
import ParameterBag from '../../src/Resource/ParameterBag';

describe('The resource repository', () => {
  const responseData = {
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
  const connector: any = {
    fetch: jest.fn(() => Promise.resolve(responseData)),
    fetchOne: jest.fn(() => Promise.resolve({ data: { data: responseData.data.data[0] } })),
  };

  it('should have the correct identifier and resource type after the creation', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype', identifier);
    expect(repository.identifier).toBe(identifier);
    expect(repository.resourceType).toBe('testtype');
  });

  it('should default the id to "id" when the id is omitted in the factory', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype2');
    expect(repository.identifier).toEqual('id');
  });

  it('should have the immutable properties resourceType and identifier after creation', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype3', identifier);
    expect(() => { repository.resourceType = 'new'; }).toThrow(TypeError);
    expect(() => { repository.identifier = 'otherid'; }).toThrow(TypeError);
  });

  it('should use the connector fetch once for the find method to do requests.', async () => {
    const connectorFind = {
      fetch: jest.fn(() => Promise.resolve(responseData)),
    };
    const repository = repositoryManager.createRepository(connectorFind as any, 'testtype4', identifier);
    await repository.find(new ParameterBag());
    expect(connectorFind.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a find containing the data array', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype5', identifier);
    return repository.find(new ParameterBag()).then((data) => {
      expect(data).toBe(responseData.data.data);
    });
  });

  it('should use the connector fetch once for the findOne method to do requests.', async () => {
    const connectorFindOne = {
      fetch: jest.fn(() => Promise.resolve(responseData)),
    };
    const repository = repositoryManager.createRepository(connectorFindOne as any, 'testtype6', identifier);
    await repository.findOne(new ParameterBag());
    expect(connectorFindOne.fetch.mock.calls).toHaveLength(1);
  });

  it('should return the promise of the connector after a findOne containing the first element of the data array', async () => {
    const repository = repositoryManager.createRepository(connector, 'testtype7', identifier);
    const data = await repository.findOne(new ParameterBag());
    expect(data).toEqual(responseData.data.data[0]);
  });

  it('should use the connector fetchOne once for the findById method to do requests.', async () => {
    const connectorFindById = {
      fetchOne: jest.fn(() => Promise.resolve(responseData.data)),
    };
    const repository = repositoryManager.createRepository(connectorFindById as any, 'testtype8', identifier);
    await repository.findById(1);
    expect(connectorFindById.fetchOne.mock.calls).toHaveLength(1);
  });

  it('should resolve to null for findOne when the connector does not give a response.', async () => {
    const connectorNullTest = {
      fetch: jest.fn(() => Promise.resolve(null)),
    };
    const repository = repositoryManager.createRepository(connectorNullTest as any, 'testtype9', identifier);
    const response = await repository.findOne(new ParameterBag());
    expect(response).toBeNull();
  });

  it('should resolve to null for findById when the connector does not give a response.', async () => {
    const connectorNullTest = {
      fetchOne: jest.fn(() => Promise.resolve(null)),
    };
    const repository = repositoryManager.createRepository(connectorNullTest as any, 'testtype10', identifier);
    const response = await repository.findById(1);
    expect(response).toBeNull();
  });

  it('should return the promise of the connector after a findById containing the data', async () => {
    const repository = repositoryManager.createRepository(connector, 'testtype11', identifier);
    const data = await repository.findById(1);
    expect(data).toBe(responseData.data.data[0]);
  });

  it('should allow a parameter bag in the connector for the findById method to do requests', async () => {
    const connectorFindOne = {
      fetchOne: jest.fn(() => Promise.resolve(responseData)),
    };
    const repository = repositoryManager.createRepository(connectorFindOne as any, 'testtype12', identifier);
    const parameterBag = new ParameterBag();
    parameterBag.addParam('include', 'relation1,relation2');

    await repository.findById(12, parameterBag);

    expect(connectorFindOne.fetchOne).toHaveBeenCalledTimes(1);
    expect(connectorFindOne.fetchOne).toHaveBeenCalledWith(repository, 12, parameterBag);
  });
});
