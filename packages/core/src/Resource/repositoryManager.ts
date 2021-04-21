import { IConnector, IRepositoryManager } from '../__types__';
import Repository from './Repository';

const createRepositoryManager = (): IRepositoryManager => {
  const repositories: Record<string, Repository<any>> = {};

  /**
   * Will ensure no repositories of duplicate resourceType are created
   */
  function addRepository(repository: Repository<any>): void {
    if (typeof repositories[repository.resourceType] === 'undefined') {
      repositories[repository.resourceType] = repository;
    }
  }

  /**
   * Will add repository if it does not exist and return the repository
   */
  function createRepository<T>(
    connector: IConnector<T>,
    resourceType: string,
    identifier = 'id',
  ): Repository<T> {
    const repository = new Repository(connector, resourceType, identifier);

    addRepository(repository);

    return repositories[repository.resourceType] as Repository<T>;
  }

  function getRepository<T>(resourceType: string): Repository<T> | null {
    return (repositories[resourceType] as Repository<T>) || null;
  }

  function getRepositories(): Record<string, Repository<any>> {
    return repositories;
  }

  return {
    repositories,
    createRepository,
    addRepository,
    getRepository,
    getRepositories,
  };
};

const repositoryManager: IRepositoryManager = createRepositoryManager();
Object.freeze(repositoryManager);

/**
 * A Singleton pattern for RepositoryManager
 */
export default repositoryManager;
