import ParameterBag from './ParameterBag';

export default class Collection {
  /**
   * @param {String} name
   * @param {HyralRepository} repository
   */
  constructor(name, repository) {
    /** @private */
    this.name = name;

    /** @private */
    this.repository = repository;

    /** @private */
    this.metadata = {
      loading: false,
      loaded: false,
      parameterBag: null,
      paging: {
        count: null,
        pages: null,
      },
    };

    /** @private */
    this.loadingPromise = null;

    /** @private */
    this.data = {
      items: [],
    };
  }

  get parameterBag() {
    if (!this.metadata.parameterBag) {
      this.metadata.parameterBag = new ParameterBag();
    }

    return this.metadata.parameterBag;
  }

  /**
   * @returns {number|null}
   */
  get length() {
    return this.metadata.paging.count;
  }

  /**
   * @returns {Array}
   */
  get items() {
    return this.data.items;
  }

  /**
   * @param {Array} items
   */
  set items(items) {
    this.data.items = items;
  }

  /**
   * @returns {Promise}
   */
  load() {
    return this.repository.find(this.parameterBag).then((response) => {
      this.items = response;
    }).finally(() => {
      this.metadata.loading = false;
      this.metadata.loaded = true;
    });
  }
}
