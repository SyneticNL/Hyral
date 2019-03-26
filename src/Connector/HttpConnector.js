/**
 * @file
 */

/**
 * Http connector class.
 */
export default {
  fetch(repository, parameterBag) {
    this.axios.request({
      repository,
      params: parameterBag,
    });
  },

  fetchOne(repository, parameterBag) {
    this.axios.get({
      repository,
      params: parameterBag,
    });
  },

  /**
   * @param {HyralResourceRepository} repository
   * @param {ParameterBag} parameterBag
   */
  create(repository, parameterBag) {
    this.axios.post({
      repository,
      data: parameterBag,
    });
  },

  /**
   * @param repository
   * @param {ParameterBag} parameterBag
   */
  update(repository, parameterBag) {
    this.axios.patch({
      repository,
      data: parameterBag,
    });
  },

  /**
   * @param repository
   * @param {ParameterBag} parameterBag
   */
  delete(repository, parameterBag) {
    this.axios.delete({
      repository,
      params: parameterBag,
    });
  },
};
