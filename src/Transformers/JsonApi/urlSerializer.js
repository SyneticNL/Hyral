/**
 * @type UrlSerializer
 */
const urlSerializer = {
  /**
   * @param {HyralResourceRepository} repository
   *
   * @returns {string}
   */
  fetch(repository) {
    return `/${repository.resourceType}`;
  },

  /**
   * @param {HyralResourceRepository} repository
   * @param {Number} id
   *
   * @returns {string}
   */
  fetchOne(repository, id) {
    return `/${repository.resourceType}/${id}`;
  },

  /**
   * @param {HyralResourceRepository} repository
   *
   * @returns {string}
   */
  create(repository) {
    return this.fetch(repository);
  },

  /**
   * @param {HyralResourceRepository} repository
   * @param {Number} id
   *
   * @returns {string}
   */
  update(repository, id) {
    return this.fetchOne(repository, id);
  },

  /**
   * @param {HyralResourceRepository} repository
   * @param {Number} id
   *
   * @returns {string}
   */
  delete(repository, id) {
    return this.fetchOne(repository, id);
  },
};

export default urlSerializer;
