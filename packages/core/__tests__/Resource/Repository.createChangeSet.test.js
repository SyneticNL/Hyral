import resourceManager from '../../src/Resource/resourceManager';

describe('The resourceManager ChangeSet', () => {
  test('That a ChangeSet can be created via the resourceManager', () => {
    const ChangeSet = resourceManager.createChangeSet();

    expect(ChangeSet).toHaveProperty('persistResource');
    expect(ChangeSet).toHaveProperty('persistCascadeResource');
    expect(ChangeSet).toHaveProperty('deleteResource');
    expect(ChangeSet).toHaveProperty('execute');
    expect(ChangeSet).toHaveProperty('status');
  });
});
