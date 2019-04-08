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
  const serializebleData = cloneDeep(serializedData);
  const privateData = {
    loading: false,
    lastParameterBagState: null,
    parameterBag: serializebleData.metadata.parameterBagData
      ? ParameterBag.createFromData(serializebleData.metadata.parameterBagData)
      : null,
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
        return serializebleData.metadata.paging.count || 0;
      },
    },
    pages: {
      /**
       * @returns {number}
       */
      get() {
        return serializebleData.metadata.paging.pages || 0;
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
        return serializebleData.metadata.loaded;
      },
    },
    items: {
      get() {
        /**
         * @returns {Array}
         */
        return serializebleData.items;
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
      serializebleData.items = response.data;
      serializebleData.metadata.paging = response.paging;
    }).finally(() => {
      privateData.loading = false;
      serializebleData.metadata.loaded = true;

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
  this.serialize = () => {
    const data = cloneDeep(serializebleData);
    data.metadata.parameterBagData = privateData.parameterBag
      ? privateData.parameterBag.serialize()
      : null;
    return data;
  };
}

export default Collection;
