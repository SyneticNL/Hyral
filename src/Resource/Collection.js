import cloneDeep from 'lodash/fp/cloneDeep';
import ParameterBag from './ParameterBag';

/**
 * @param {String|Object} name
 * @param {HyralRepository} repository
 * @param {Object} dataDefaults
 * @param {ParameterBag|Object} parameterBag
 */
function Collection(
  name,
  repository,
  dataDefaults = {
    items: [],
    metadata: {
      loaded: false,
      paging: {
        count: null,
        pages: null,
      },
    },
  },
  parameterBag = null,
) {
  if (!new.target) {
    throw Error('Collection() must be called with new');
  }

  const data = cloneDeep(dataDefaults);
  const privateData = {
    loading: false,
    lastParameterBagState: null,
    parameterBag: null,
  };

  if (parameterBag instanceof ParameterBag) {
    privateData.parameterBag = parameterBag;
  }

  if (parameterBag && !(parameterBag instanceof ParameterBag)) {
    privateData.parameterBag = ParameterBag.createFromData(parameterBag);
  }

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
      set(newParameterBag) {
        privateData.parameterBag = newParameterBag;
        privateData.lastParameterBagState = null;
      },
    },
    length: {
      /**
       * @returns {number}
       */
      get() {
        return data.metadata.paging.count || 0;
      },
    },
    pages: {
      /**
       * @returns {number}
       */
      get() {
        return data.metadata.paging.pages || 0;
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
        return data.metadata.loaded;
      },
    },
    items: {
      get() {
        /**
         * @returns {Array}
         */
        return data.items;
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
      data.items = response.data;
      data.metadata.paging = response.paging;
    }).finally(() => {
      privateData.loading = false;
      data.metadata.loaded = true;

      privateData.lastParameterBagState = this.parameterBag.stateId;
    });
  };

  /**
   * @returns {Collection}
   */
  this.clone = () => new Collection(
    name,
    repository,
    this.serialize(),
    this.parameterBag instanceof ParameterBag ? this.parameterBag.clone() : null,
  );

  /**
   * @returns {Object}
   */
  this.serialize = () => cloneDeep(data);
}

export default Collection;
