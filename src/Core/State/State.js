import concat from 'lodash/concat';

/**
 * @returns {object}
 */
export function currentState(state) {
  return state[state.length - 1];
}

/**
 * @returns {object|null}
 */
export function previousState(state) {
  return state.length > 1 ? state[state.length - 2] : null;
}

/**
 * @param {[{}]} state
 * @param {Object} newState
 */
export function mutateState(state, newState) {
  const mergedState = {};

  concat(Object.keys(currentState(state)), Object.keys(newState))
    .filter((value, index, self) => self.indexOf(value) === index)
    .forEach((key) => {
      mergedState[key] = newState[key] ? newState[key] : currentState(state)[key];
    });

  state.push(mergedState);
}

/**
 * @param {[{}]} state
 * @param {Object} newState
 */
export function setState(state, newState) {
  state.push(newState);
}

/**
 * @param {[{}]} state
 */
export function resetState(state) {
  // eslint-disable-next-line no-param-reassign
  state = [];
}
