/**
 * @typedef HyralFilter
 * @type {Object}
 * @property {string} field - The field to filter on
 * @property {string} value - The value to filter with
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

/**
 * ParameterBag.
 */
export default class ParameterBag {
  constructor() {
    /** @private */
    this.parameters = {
      filters: [],
      sorting: [],
      paging: {},
      params: {},
    };
  }

  /**
   * @returns {HyralFilter[]}
   */
  get filters() {
    return this.parameters.filters;
  }

  /**
   * @param {HyralFilter[]} filter
   */
  addFilter(filter) {
    this.parameters.filters.push(filter);
  }

  /**
   * @param {HyralFilter[]} filters
   */
  setFilters(filters) {
    this.parameters.filters = filters;
  }

  /**
   * @returns {HyralPaging}
   */
  get paging() {
    return this.parameters.paging;
  }

  /**
   * @param {HyralPaging} paging
   */
  setPaging(paging) {
    this.parameters.paging = paging;
  }

  /**
   * @returns {HyralSorting[]}
   */
  get sorting() {
    return this.parameters.sorting;
  }

  /**
   * @param {HyralSorting[]} sorting
   */
  setSorting(sorting) {
    this.parameters.sorting = sorting;
  }

  /**
   * @returns {Object}
   */
  get params() {
    return this.parameters.params;
  }

  /**
   * @param {string} key
   * @param value
   */
  addParam(key, value) {
    this.parameters.params[key] = value;
  }

  /**
   * @param {Object} params
   */
  setParams(params) {
    this.parameters.params = params;
  }
}
