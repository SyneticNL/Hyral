/**
 * Http connector class.
 */
export default {
  /**
   * @param {HyralRepository} repository
   * @param {ParameterBag} parameterBag
   */
  fetch(repository, parameterBag) {
    return this.axios.get(this.urlSerializer.fetch(repository), {
      params: parameterBag,
    });
  },

  /**
   * @param {HyralRepository} repository
   * @param {number|string} id
   * @param {ParameterBag} parameterBag
   */
  fetchOne(repository, id, parameterBag) {
    return this.axios.get(this.urlSerializer.fetchOne(repository, id), {
      params: parameterBag,
    });
  },

  /**
   * @param {HyralRepository} repository
   * @param {ParameterBag} parameterBag
   */
  create(repository, parameterBag) {
    this.axios.post({
      repository,
      data: parameterBag,
    });
  },

  /**
   * @param {HyralRepository} repository
   * @param {ParameterBag} parameterBag
   */
  update(repository, parameterBag) {
    this.axios.patch({
      repository,
      data: parameterBag,
    });
  },

  /**
   * @param {HyralRepository} repository
   * @param {ParameterBag} parameterBag
   */
  delete(repository, parameterBag) {
    this.axios.delete({
      repository,
      params: parameterBag,
    });
  },
};
