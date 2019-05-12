import pluralize from 'pluralize';

/**
 * @type UrlSerializer
 */
export default {
  /**
   * @param {HyralRepository} repository
   *
   * @returns {string}
   */
  fetch(repository) {
    return `/${pluralize(repository.resourceType)}`;
  },

  /**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */
  fetchOne(repository, id) {
    return `/${pluralize(repository.resourceType)}/${id}`;
  },

  /**
   * @param {string} resourceType
   *
   * @returns {string}
   */
  create(resourceType) {
    return `/${pluralize(resourceType)}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   *
   * @returns {string}
   */
  update(resourceType, id) {
    return `/${pluralize(resourceType)}/${id}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   *
   * @returns {string}
   */
  delete(resourceType, id) {
    return `/${pluralize(resourceType)}/${id}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   * @param {object} relation
   *
   * @returns {string}
   */
  relation(resourceType, id, relation) {
    return `/${pluralize(resourceType)}/${id}/relationships/${relation.resource}`;
  },
};
