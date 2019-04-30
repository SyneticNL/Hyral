import waitForExpect from 'wait-for-expect';
import Resource from '../../../../src/Core/Resource/Resource';
import repositoryManager from '../../../../src/Core/Repository/RepositoryManager';

describe('The Resource', () => {
  test('that the metadata is correctly initialized', () => {
    const resource1 = Resource(1, 'product');

    expect(resource1.metadata.loaded).toBeFalsy();
    expect(resource1.metadata.loading).toBeFalsy();

    const resource2 = Resource(1, 'product', { test: 'property' });
    expect(resource2.metadata.loaded).toBeTruthy();
    expect(resource2.metadata.loading).toBeFalsy();
  });

  test('that the data is correctly lazy-loaded once the data prop is accessd', () => {
    const repositoryFindMock = jest.fn(() => Promise.resolve(Resource(1, 'product', { test: 'property' })));
    const productRepository = {
      resourceType: 'product',
      findById: repositoryFindMock,
    };
    repositoryManager.addRepository(productRepository);

    const resource1 = Resource(1, 'product');

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
});
