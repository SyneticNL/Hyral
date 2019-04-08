import cloneDeep from 'lodash/fp/cloneDeep';
import ParameterBag from './ParameterBag';

/**
 * @param {String|Object} name
 * @param {HyralRepository} repository
 * @param {Object} serializedData
 */
function Collection(name, repository, serializedData = {
  name,
  items: [],
  metadata: {
    loaded: false,
    parameterBagData: null,
    paging: {
      count: null,
      pages: null,
    },
  },
}) {
  if (!new.target) {
    throw Error('Collection() must be called with new');
  }
  const publicData = cloneDeep(serializedData);
  const privateData = {
    loading: false,
    lastParameterBagState: null,
    parameterBag: null,
  };


  Object.defineProperties(this, {
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
    parameterBag: {
      get() {
        if (!privateData.parameterBag) {
          privateData.parameterBag = new ParameterBag();
        }

        return privateData.parameterBag;
      },
      set(parameterBag) {
        privateData.parameterBag = parameterBag;
        privateData.lastParameterBagState = null;
      },
    },
    length: {
      /**
       * @returns {number}
       */
      get() {
        return publicData.metadata.paging.count || 0;
      },
    },
    pages: {
      /**
       * @returns {number}
       */
      get() {
        return publicData.metadata.paging.pages || 0;
      },
    },
    isLoading: {
      /**
       * @returns {boolean}
       */
      get() {
        return privateData.loading;
      },
    },
    isLoaded: {
      /**
       * @returns {boolean}
       */
      get() {
        return publicData.metadata.loaded;
      },
    },
    items: {
      get() {
        /**
         * @returns {Array}
         */
        return publicData.items;
      },
    },
  });

  /**
   * @returns {Promise}
   */
  this.load = () => {
    if (this.isLoaded === true
      && privateData.lastParameterBagState === this.parameterBag.stateId) {
      return Promise.resolve();
    }
    privateData.loading = true;
    return this.repository.find(this.parameterBag).then((response) => {
      publicData.items = response.data;
      publicData.metadata.paging = response.paging;
    }).finally(() => {
      privateData.loading = false;
      publicData.metadata.loaded = true;

      privateData.lastParameterBagState = this.parameterBag.stateId;
    });
  };

  /**
   * @returns {Collection}
   */
  this.clone = () => new Collection(name, repository, this.serialize());

  /**
   * @returns {Object}
   */
  this.serialize = () => cloneDeep(publicData);
}

export default Collection;
