import repositoryManager from '../../src/Resource/repositoryManager';
import { ITask } from '../../src/__types__';

describe('The repository mutations', () => {
  const identifier = 'tid';
  const connector = {
    create: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    relation: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
  };

  test('the connector is called correctly', async () => {
    const repository = repositoryManager.createRepository(connector as any, 'testtype', identifier);

    const task = {} as ITask<any>;

    await repository.create(task);
    expect(connector.create).toHaveBeenCalledWith(task);

    await repository.update(task);
    expect(connector.update).toHaveBeenCalledWith(task);

    await repository.delete(task);
    expect(connector.delete).toHaveBeenCalledWith(task);
  });
});
