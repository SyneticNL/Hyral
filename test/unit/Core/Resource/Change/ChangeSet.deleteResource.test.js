import ResourceManager from '../../../../../src/Core/Resource/ResourceManager';
import Resource from '../../../../../src/Core/Resource/Resource';

describe('The ResourceManager ChangeSet', () => {
  test('that a task is created when deleting a resource', () => {
    const ChangeSet = ResourceManager.createChangeSet();

    const existingResource = Resource(1, 'book', { title: 'A great book' });

  });
});
