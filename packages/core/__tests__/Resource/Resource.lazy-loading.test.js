import waitForExpect from 'wait-for-expect';
import Resource from '../../src/Resource/Resource';
import repositoryManager from '../../src/Resource/repositoryManager';

describe('The lazy loading of a resource', () => {
  test('that the data is correctly lazy-loaded once the data prop is accessed', () => {
    const repositoryFindMock = jest.fn(() => Promise.resolve(Resource.create(1, 'product', { test: 'property' })));
    const productRepository = {
      resourceType: 'product',
      findById: repositoryFindMock,
    };
    repositoryManager.addRepository(productRepository);

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
});
