/* eslint-disable no-underscore-dangle */
import cloneDeep from 'lodash/fp/cloneDeep';
/**
 * @typedef HyralFilter
 * @type {Object}
 * @property {string} field - The field to filter on
 * @property {string|number|boolean|null} value - The value to filter with
 */

/**
 * @typedef HyralSorting
 * @type {Object}
 * @property {string} field - The field to sort on
 * @property {string} [direction]="asc" - The direction for this field
 */

/**
 * @typedef HyralPaging
 * @type {Object}
 * @property {number} offset=0 - The starting record.
 * @property {number} [limit]=20 - The amount of resources to fetch.
 */

function ParameterBag() {
  if (!new.target) {
    throw Error('ParameterBag() must be called with new');
  }

  Object.defineProperty(this, '_state', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: {
      parameters: {
        filters: [],
        sorting: [],
        paging: {},
        params: {},
      },
      metadata: {
        stateId: 0,
      },
    },
  });
}

ParameterBag.prototype = {
  /**
   * @returns {HyralFilter[]}
   */
  get filters() {
    return this._state.parameters.filters;
  },

  /**
   * @param {HyralFilter} filter
   */
  addFilter(filter) {
    this._state.parameters.filters.push(filter);
    this.updateStateId();
  },

  /**
   * @param {HyralFilter[]} filters
   */
  setFilters(filters) {
    this._state.parameters.filters = filters;
    this.updateStateId();
  },

  /**
   * @returns {HyralPaging}
   */
  get paging() {
    return this._state.parameters.paging;
  },

  /**
   * @param {HyralPaging} paging
   */
  setPaging(paging) {
    this._state.parameters.paging = paging;
    this.updateStateId();
  },

  /**
   * @returns {HyralSorting[]}
   */
  get sorting() {
    return this._state.parameters.sorting;
  },

  /**
   * @param {HyralSorting[]} sorting
   */
  setSorting(sorting) {
    this._state.parameters.sorting = sorting;
    this.updateStateId();
  },

  /**
   * @returns {Object}
   */
  get params() {
    return this._state.parameters.params;
  },

  /**
   * @param {string} key
   * @param value
   */
  addParam(key, value) {
    this._state.parameters.params[key] = value;
    this.updateStateId();
  },

  /**
   * @param {Object} params
   */
  setParams(params) {
    this._state.parameters.params = params;
    this.updateStateId();
  },

  get stateId() {
    return this._state.metadata.stateId;
  },

  updateStateId() {
    this._state.metadata.stateId += 1;
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
};

export default ParameterBag;
