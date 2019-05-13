
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
import repositoryManager from '../repositoryManager';

/**
 *
 * @param {HyralRepositoryManager} manager
 *
 * @returns {HyralChangeSet}
 *
 * @constructor
 */
function ChangeSet(manager) {
  /** @type {HyralTask[]} */
  const tasks = [];

  return Object.assign(
    {
      get tasks() {
        return tasks;
      },
    },
    TaskGenerator(tasks, manager),
    ChangeSetExecuter(tasks),
  );
}

/**
 * @returns {HyralChangeSet}
 */
ChangeSet.create = () => ChangeSet(repositoryManager);

export default ChangeSet;
