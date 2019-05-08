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

import { currentState, setState, mutateState } from '../State/State';

function ParameterBag() {
  const state = [{
    filters: [],
    sorting: [],
    paging: {},
    params: {},
  }];

  return {
    /**
     * @returns {HyralFilter[]}
     */
    get filters() {
      return currentState(state).filters;
    },

    /**
     * @param {HyralFilter} filter
     */
    addFilter(filter) {
      const { filters } = currentState(state);
      filters.push(filter);
      mutateState(state, {
        filters,
      });
    },

    /**
     * @param {HyralFilter[]} filters
     */
    setFilters(filters) {
      mutateState(state, {
        filters,
      });
    },

    /**
     * @returns {HyralPaging}
     */
    get paging() {
      return currentState(state).paging;
    },

    /**
     * @param {HyralPaging} paging
     */
    setPaging(paging) {
      mutateState(state, {
        paging,
      });
    },

    /**
     * @returns {HyralSorting[]}
     */
    get sorting() {
      return currentState(state).sorting;
    },

    /**
     * @param {HyralSorting[]} sorting
     */
    setSorting(sorting) {
      mutateState(state, {
        sorting,
      });
    },

    /**
     * @returns {Object}
     */
    get params() {
      return currentState(state).params;
    },

    /**
     * @param {string} key
     * @param value
     */
    addParam(key, value) {
      mutateState(state, {
        params: Object.assign({}, currentState(state).params, {
          [key]: value,
        }),
      });
    },

    /**
     * @param {Object} params
     */
    setParams(params) {
      mutateState(state, {
        params,
      });
    },

    get stateId() {
      return state.length - 1;
    },

    /**
     * @returns {[{}]}
     */
    get stateStack() {
      return state;
    },

    /**
     * @returns {object}
     */
    get state() {
      return currentState(state);
    },

  };
}

ParameterBag.fromState = (state) => {
  const parameterBag = ParameterBag();

  setState(parameterBag.stateStack, state);

  return parameterBag;
};

export default ParameterBag;
