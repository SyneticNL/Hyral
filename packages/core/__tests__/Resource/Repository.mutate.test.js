import repositoryManager from '../../src/Resource/repositoryManager';

describe('The repository mutations', () => {
  const identifier = 'tid';
  const connector = {
    create: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    relation: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
  };

  test('the connector is called correctly', () => {
    const repository = repositoryManager.createRepository(connector, 'testtype', identifier);

    const task = {};

    repository.create(task);
    expect(connector.create).toHaveBeenCalledWith(task);

    repository.update(task);
    expect(connector.update).toHaveBeenCalledWith(task);

    repository.relation(task);
    expect(connector.relation).toHaveBeenCalledWith(task);

    repository.delete(task);
    expect(connector.delete).toHaveBeenCalledWith(task);
  });
});
