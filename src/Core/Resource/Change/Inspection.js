import isEqual from 'lodash/isEqual';
import { previousState } from '../../State/State';

/**
 * @param {HyralResource} resource
 *
 * @returns {boolean}
 */
export function resourceIsNew(resource) {
  return resource.id === null;
}

/**
 * @param {HyralResource} resource
 *
 * @returns {boolean}
 */
export function resourceHasChanged(resource) {
  return resourceIsNew(resource) || (
    previousState(resource.stateStack) !== null
    && !isEqual(previousState(resource.stateStack), resource.state)
  );
}

/**
 * @param task
 *
 * @returns {boolean}
 */
export function isTask(task) {
  return task.type && typeof task.payload !== 'undefined';
}
