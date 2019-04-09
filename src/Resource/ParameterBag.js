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

const cloneReducer = (accumulator, item) => {
  accumulator.push({ ...item });
  return accumulator;
};

function ParameterBag() {
  if (!new.target) {
    throw Error('ParameterBag() must be called with new');
  }

  Object.defineProperty(this, 'parameters', {
    enumerable: false,
    configurable: false,
    value: {
      filters: [],
      sorting: [],
      paging: {},
      params: {},
    },
  });

  Object.defineProperty(this, 'metadata', {
    enumerable: false,
    configurable: false,
    value: {
      stateId: 0,
    },
  });

  Object.defineProperty(this, 'updateStateId', {
    enumerable: false,
    configurable: false,
    value: () => {
      this.metadata.stateId += 1;
    },
  });
}

ParameterBag.prototype = {
  /**
   * @returns {HyralFilter[]}
   */
  get filters() {
    return this.parameters.filters;
  },

  /**
   * @param {HyralFilter} filter
   */
  addFilter(filter) {
    this.parameters.filters.push(filter);
    this.updateStateId();
  },

  /**
   * @param {HyralFilter[]} filters
   */
  setFilters(filters) {
    this.parameters.filters = filters;
    this.updateStateId();
  },

  /**
   * @returns {HyralPaging}
   */
  get paging() {
    return this.parameters.paging;
  },

  /**
   * @param {HyralPaging} paging
   */
  setPaging(paging) {
    this.parameters.paging = paging;
    this.updateStateId();
  },

  /**
   * @returns {HyralSorting[]}
   */
  get sorting() {
    return this.parameters.sorting;
  },

  /**
   * @param {HyralSorting[]} sorting
   */
  setSorting(sorting) {
    this.parameters.sorting = sorting;
    this.updateStateId();
  },

  /**
   * @returns {Object}
   */
  get params() {
    return this.parameters.params;
  },

  /**
   * @param {string} key
   * @param value
   */
  addParam(key, value) {
    this.parameters.params[key] = value;
    this.updateStateId();
  },

  /**
   * @param {Object} params
   */
  setParams(params) {
    this.parameters.params = params;
    this.updateStateId();
  },

  get stateId() {
    return this.metadata.stateId;
  },

  /**
   * @return {ParameterBag}
   */
  clone() {
    const clone = new ParameterBag();
    clone.setFilters(this.filters.reduce(cloneReducer, []));
    clone.setPaging({ ...this.paging });
    clone.setSorting(this.sorting.reduce(cloneReducer, []));
    clone.setParams({ ...this.params });

    return clone;
  },

  /**
   * @return {Object}
   */
  serialize() {
    return cloneDeep({
      params: this.params,
      filters: this.filters,
      paging: this.paging,
      sorting: this.sorting,
    });
  },
};

/**
 * @return {ParameterBag}
 */
ParameterBag.createFromData = (data) => {
  const parameterBag = new ParameterBag();
  parameterBag.setFilters(data.filters);
  parameterBag.setParams(data.params);
  parameterBag.setPaging(data.paging);
  parameterBag.setSorting(data.sorting);
  return parameterBag;
};

export default ParameterBag;
