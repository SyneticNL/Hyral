import ParameterBag from './ParameterBag';

function defineCollectionProperties(collection, {
  name,
  repository,
  items = [],
  count = null,
  pages = null,
  loaded = false,
  parameterBag = null,
}) {
  Object.defineProperties(collection, {
    name: {
      enumerable: true,
      configurable: false,
      writable: false,
      value: name,
    },
    repository: {
      enumerable: true,
      configurable: false,
      writable: false,
      value: repository,
    },
    metadata: {
      enumerable: false,
      configurable: false,
      value: {
        loading: false,
        loaded,
        parameterBag,
        lastParameterBagState: null,
        paging: {
          count,
          pages,
        },
      },
    },
    data: {
      enumerable: false,
      configurable: false,
      value: {
        items,
      },
    },
  });
}

/**
 * @param {String} name
 * @param {HyralRepository} repository
 */
function Collection(name, repository) {
  if (!new.target) {
    throw Error('Collection() must be called with new');
  }

  defineCollectionProperties(this, { name, repository });
}

Collection.prototype = {
  get parameterBag() {
    if (!this.metadata.parameterBag) {
      this.metadata.parameterBag = new ParameterBag();
    }

    return this.metadata.parameterBag;
  },

  set parameterBag(parameterBag) {
    this.metadata.parameterBag = parameterBag;
  },

  /**
   * @returns {number}
   */
  get length() {
    return this.metadata.paging.count || 0;
  },

  /**
   * @returns {number}
   */
  get pages() {
    return this.metadata.paging.pages || 0;
  },

  /**
   * @returns {boolean}
   */
  get isLoading() {
    return this.metadata.loading;
  },

  /**
   * @returns {boolean}
   */
  get isLoaded() {
    return this.metadata.loaded;
  },

  /**
   * @returns {Array}
   */
  get items() {
    return this.data.items;
  },

  /**
   * @returns {Promise}
   */
  load() {
    if (this.isLoaded === true
      && this.metadata.lastParameterBagState === this.parameterBag.stateId) {
      return Promise.resolve();
    }

    this.metadata.loading = true;
    return this.repository.find(this.metadata.parameterBag).then((response) => {
      this.data.items = response.data;
      this.metadata.paging = response.paging;
    }).finally(() => {
      this.metadata.loading = false;
      this.metadata.loaded = true;

      this.metadata.lastParameterBagState = this.parameterBag.stateId;
    });
  },

  /**
   * @returns {Collection}
   */
  clone() {
    const clone = Object.create(Collection.prototype);
    defineCollectionProperties(clone, {
      name: this.name,
      repository: this.repository,
      items: this.data.items,
      count: this.metadata.paging.count,
      pages: this.metadata.paging.pages,
      loaded: this.metadata.loaded,
      parameterBag: this.parameterBag.clone(),
    });
    return clone;
  },
};

export default Collection;
