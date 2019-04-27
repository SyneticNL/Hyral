import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

/**
 * @returns {object}
 */
export function currentState(state) {
  return state[state.length - 1];
}

/**
 * @param {[{}]} state
 * @param {Object} newState
 */
export function setState(state, newState) {
  state.push(merge(cloneDeep(currentState(state)), newState));
}
