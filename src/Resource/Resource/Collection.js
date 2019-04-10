/* eslint-disable no-underscore-dangle */
import cloneDeep from 'lodash/fp/cloneDeep';
import ParameterBag from '../ParameterBag';

/**
 * @param {String} name
 * @param {HyralRepository} repository
 */
function Collection(name, repository) {
  if (!new.target) {
    throw Error('Collection() must be called with new');
  }

  this._repository = repository;

  Object.defineProperties(this, {
    _state: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: {
        name,
        data: {
          items: [],
        },
        metadata: {
          loading: false,
          loaded: false,
          parameterBag: null,
          lastParameterBagState: null,
          paging: {
            count: null,
            pages: null,
          },
        },
      },
    },
  });
}

Collection.prototype = {
  get name() {
    return this._state.name;
  },

  get repository() {
    return this._repository;
  },

  get parameterBag() {
    return ParameterBag.fromState(this._state.metadata.parameterBag || {});
  },

  set parameterBag(parameterBag) {
    this._state.metadata.parameterBag = parameterBag.state;
  },

  /**
   * @returns {number}
   */
  get length() {
    return this._state.metadata.paging.count || 0;
  },

  /**
   * @returns {number}
   */
  get pages() {
    return this._state.metadata.paging.pages || 0;
  },

  /**
   * @returns {boolean}
   */
  get isLoading() {
    return this._state.metadata.loading;
  },

  /**
   * @returns {boolean}
   */
  get isLoaded() {
    return this._state.metadata.loaded;
  },

  /**
   * @returns {Array}
   */
  get items() {
    return this._state.data.items;
  },

  /**
   * @returns {object}
   */
  get state() {
    return cloneDeep(this._state);
  },

  /**
   * @param newState {object}
   */
  set newState(newState) {
    this._state = cloneDeep(newState);
  },

  /**
   * @returns {Promise}
   */
  load() {
    if (this.isLoaded === true
      && this._state.metadata.lastParameterBagState === this.parameterBag.stateId) {
      return Promise.resolve();
    }

    this._state.metadata.loading = true;
    return this.repository.find(this.parameterBag).then((response) => {
      this._state.data.items = response.data;
      this._state.metadata.paging = response.paging;
    }).finally(() => {
      this._state.metadata.loading = false;
      this._state.metadata.loaded = true;

      this._state.metadata.lastParameterBagState = this.parameterBag.stateId;
    });
  },
};

Collection.fromState = (state, repository) => {
  const newCollection = new Collection(state.name, repository);
  newCollection.newState = state;
  return newCollection;
};

export default Collection;
