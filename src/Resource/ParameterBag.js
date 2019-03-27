/**
 * @typedef HyralFilter
 * @type {Object}
 * @property {string} field - The field to filter on
 * @property {string} value - The value to filter with
 * @property {string} [operator] - The operator to use.
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
   * @param {HyralFilter[]} value
   */
  set filters(value) {
    this.parameters.filters = value;
  }

  /**
   * @returns {HyralPaging}
   */
  get paging() {
    return this.parameters.paging;
  }

  /**
   * @param {HyralPaging} value
   */
  set paging(value) {
    this.parameters.paging = value;
  }

  /**
   * @returns {HyralSorting[]}
   */
  get sorting() {
    return this.parameters.sorting;
  }

  /**
   * @param {HyralSorting[]} value
   */
  set sorting(value) {
    this.parameters.sorting = value;
  }

  /**
   * @returns {Object}
   */
  get params() {
    return this.parameters.params;
  }

  /**
   * @param {Object} value
   */
  set params(value) {
    this.parameters.params = value;
  }
}
