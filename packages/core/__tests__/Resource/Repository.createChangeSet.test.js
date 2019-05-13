import ChangeSet from '../../src/Resource/Change/ChangeSet';

describe('The repositoryManager ChangeSet', () => {
  test('That a ChangeSet can be created via the repositoryManager', () => {
    const set = ChangeSet.create();

    expect(set).toHaveProperty('persistResource');
    expect(set).toHaveProperty('persistCascadeResource');
    expect(set).toHaveProperty('deleteResource');
    expect(set).toHaveProperty('execute');
    expect(set).toHaveProperty('status');
  });
});
