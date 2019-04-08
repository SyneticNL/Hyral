import createRepository from './RepositoryFactory';
import Repository from './Repository';

const repositories = new Map();

const RepositoryManager = {};

Object.assign(RepositoryManager, {
  /**
   * @param {HyralConnector} connector
   * @param {String} resourceType
   * @param {String} identifier='id'
   *
   * @returns HyralRepository
   */
  createRepository(connector, resourceType, identifier = 'id') {
    return createRepository(RepositoryManager, Repository, connector, resourceType, identifier);
  },
  /**
   * @param {HyralRepository} resourceRepository
   */
  addRepository(resourceRepository) {
    repositories.set(resourceRepository.resourceType, resourceRepository);
  },
  /**
   * @param resourceType
   */
  getRepository(resourceType) {
    return repositories.get(resourceType);
  },
});

export default RepositoryManager;
