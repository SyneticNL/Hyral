import Repository from './Repository';

/**
 * @typedef HyralResourceManager
 *
 * @type {Object}
 * @property {function} createRepository
 * @property {function} addRepository
 * @property {function} getRepository
 * @property {function} getRepositories
 */

const repositories = {};

/**
 * @type {HyralResourceManager}
 */
const ResourceManager = {};

Object.assign(ResourceManager, {
  /**
   * @param {HyralConnector} connector
   * @param {String} resourceType
   * @param {String} identifier='id'
   *
   * @returns HyralRepository
   */
  createRepository(connector, resourceType, identifier = 'id') {
    const repository = Repository(connector, resourceType, identifier);

    ResourceManager.addRepository(repository);

    return repository;
  },
  /**
   * @param {HyralRepository} resourceRepository
   */
  addRepository(resourceRepository) {
    if (typeof repositories[resourceRepository.resourceType] !== 'undefined') {
      throw Error(`Trying to add a repository for ${resourceRepository.resourceType} while there already exists a repository for that type.`);
    }
    repositories[resourceRepository.resourceType] = resourceRepository;
  },
  /**
   * @param resourceType
   *
   * @returns HyralRepository|null
   */
  getRepository(resourceType) {
    return repositories[resourceType] || null;

  },
  /**
   * @returns {{resourceType: HyralRepository}}
   */
  getRepositories() {
    return repositories;
  },
});

export default ResourceManager;
