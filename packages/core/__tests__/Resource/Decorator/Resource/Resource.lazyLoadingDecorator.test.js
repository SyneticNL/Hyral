import waitForExpect from 'wait-for-expect';
import Resource from '../../../../src/Resource/Resource';
import repositoryManager from '../../../../src/Resource/repositoryManager';

describe('The lazy loading of a resource', () => {
  const repositoryFindMock = jest.fn(() => Promise.resolve(Resource.create(1, 'product', { test: 'property' })));
  const productRepository = {
    resourceType: 'product',
    findById: repositoryFindMock,
  };
  repositoryManager.addRepository(productRepository);

  test('that the data is correctly lazy-loaded once the data prop is accessed', () => {
    const resource1 = Resource.create(1, 'product');

    expect(resource1.metadata.loaded).toBeFalsy();
    expect(resource1.metadata.loading).toBeFalsy();

    expect(resource1.data).toEqual({});
    expect(resource1.metadata.loading).toBeTruthy();
    expect(productRepository.findById.mock.calls).toHaveLength(1);

    return waitForExpect(() => {
      expect(resource1.metadata.loading).toBeFalsy();
    }).then(() => {
      expect(resource1.data).toEqual({ test: 'property' });
      expect(resource1.metadata.loading).toBeFalsy();
      expect(resource1.metadata.loaded).toBeTruthy();
    });
  });

  test('that the load method throws an Error when no repository is found', async () => {
    const resource2 = Resource.create(1, 'product2');

    await expect(() => resource2.load()).toThrow(Error);
  });

  test('that the load method throws an Error the repository fails to load the resource', async () => {
    const repositoryFindRejectionMock = jest.fn(() => Promise.reject());
    const productRejectionRepository = {
      resourceType: 'product2',
      findById: repositoryFindRejectionMock,
    };
    repositoryManager.addRepository(productRejectionRepository);

    const resource2 = Resource.create(1, 'product2');

    await expect(resource2.load()).rejects.toThrow(Error);
  });

  test('that the data can still be changed after lazy loading', () => {
    const resource2 = Resource.create(1, 'product');

    expect(resource2.data).toEqual({});

    return waitForExpect(() => {
      expect(resource2.metadata.loading).toBeFalsy();
    }).then(() => {
      expect(resource2.data).toEqual({ test: 'property' });

      resource2.data = { test: 'property2', another: 'property' };

      expect(resource2.stateStack).toHaveLength(3);
      expect(resource2.data.test).toEqual('property2');
      expect(resource2.data.another).toEqual('property');
    });
  });
});
