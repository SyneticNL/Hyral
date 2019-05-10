
/**
 * @typedef HyralChangeSet
 *
 * @type {Object}
 * @property {function} persistResource
 * @property {function} persistCascadeResource
 * @property {function} deleteResource
 * @property {function} execute
 * @property {function} status
 */

import TaskGenerator from './Task/TaskGenerator';
import ChangeSetExecuter from './ChangeSetExecuter';

/**
 *
 * @param {HyralResourceManager} resourceManager
 *
 * @returns {HyralChangeSet}
 *
 * @constructor
 */
export default function ChangeSet(resourceManager) {
  /** @type {HyralTask[]} */
  const tasks = [];

  return Object.assign(
    {
      get tasks() {
        return tasks;
      },
    },
    TaskGenerator(tasks, resourceManager),
    ChangeSetExecuter(tasks),
  );
}
