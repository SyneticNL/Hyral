import ResourceManager from '../../../../src/Core/Resource/ResourceManager';

describe('The ResourceManager ChangeSet', () => {
  test('That a ChangeSet can be created via the ResourceManager', () => {
    const ChangeSet = ResourceManager.createChangeSet();

    expect(ChangeSet).toHaveProperty('persistResource');
    expect(ChangeSet).toHaveProperty('persistCascadeResource');
    expect(ChangeSet).toHaveProperty('deleteResource');
    expect(ChangeSet).toHaveProperty('execute');
    expect(ChangeSet).toHaveProperty('status');
  });
});
