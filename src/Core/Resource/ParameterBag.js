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

import { currentState, setState } from '../State/State';

function ParameterBag() {
  const state = [{
    parameters: {
      filters: [],
      sorting: [],
      paging: {},
      params: {},
    },
    metadata: {
      stateId: 0,
    },
  }];

  return {
    /**
     * @returns {HyralFilter[]}
     */
    get filters() {
      return currentState(state).parameters.filters;
    },

    /**
     * @param {HyralFilter} filter
     */
    addFilter(filter) {
      const { filters } = currentState(state).parameters;
      filters.push(filter);
      setState(state, {
        parameters: {
          filters,
        },
      });
    },

    /**
     * @param {HyralFilter[]} filters
     */
    setFilters(filters) {
      setState(state, {
        parameters: {
          filters,
        },
      });
    },

    /**
     * @returns {HyralPaging}
     */
    get paging() {
      return currentState(state).parameters.paging;
    },

    /**
     * @param {HyralPaging} paging
     */
    setPaging(paging) {
      setState(state, {
        parameters: {
          paging,
        },
      });
    },

    /**
     * @returns {HyralSorting[]}
     */
    get sorting() {
      return currentState(state).parameters.sorting;
    },

    /**
     * @param {HyralSorting[]} sorting
     */
    setSorting(sorting) {
      setState(state, {
        parameters: {
          sorting,
        },
      });
    },

    /**
     * @returns {Object}
     */
    get params() {
      return currentState(state).parameters.params;
    },

    /**
     * @param {string} key
     * @param value
     */
    addParam(key, value) {
      setState(state, {
        parameters: {
          params: {
            [key]: value,
          },
        },
      });
    },

    /**
     * @param {Object} params
     */
    setParams(params) {
      setState(state, {
        parameters: {
          params,
        },
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
