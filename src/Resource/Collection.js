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

  set parameterBag(parameterBag) {
    this.metadata.parameterBag = parameterBag;
  }

  /**
   * @returns {number}
   */
  get length() {
    return this.metadata.paging.count || 0;
  }

  /**
   * @returns {number}
   */
  get pages() {
    return this.metadata.paging.pages || 0;
  }

  /**
   * @returns {boolean}
   */
  get isLoading() {
    return this.metadata.loading;
  }

  /**
   * @returns {boolean}
   */
  get isLoaded() {
    return this.metadata.loaded;
  }

  /**
   * @returns {Array}
   */
  get items() {
    return this.data.items;
  }

  /**
   * @returns {Promise}
   */
  load() {
    this.metadata.loading = true;
    return this.repository.find(this.parameterBag).then((response) => {
      this.data.items = response.data;
      this.metadata.paging = response.paging;
    }).finally(() => {
      this.metadata.loading = false;
      this.metadata.loaded = true;
    });
  }
}
