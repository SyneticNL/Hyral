/**
 * @file
 */

/**
 * Http connector class.
 */
export default {
  /**
   * @param {HyralResourceRepository} repository
   * @param {ParameterBag} parameterBag
   */
  fetch(repository, parameterBag) {
    return this.axios.get(this.urlSerializer.fetch(repository), {
      params: parameterBag,
    });
  },

  fetchOne(repository, id, parameterBag) {
    return this.axios.get(this.urlSerializer.fetchOne(repository, id), {
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
