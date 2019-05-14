import concat from 'lodash/concat';
import { resetState, setState } from '../../../State/State';

/**
 * @typedef HyralTask
 *
 * @type {object}
 * @property {string} type - The type of task (create/update/delete/relation)
 * @property {object} payload - The payload for the task (the changed resource or the relation)
 * @property {object|null} context - The context. This is the resource on a relation task.
 * @property {array} related - All tasks on this entity.
 * @property {array} dependencies - Tasks that need to be executed and resolved before this task.
 * @property {boolean} resolved - If the task has been resolved.
 * @property {boolean} claimed - If the task has been claimed.
 * @property {function} claim - Claim a task (will not be processed via other means anymore)
 * @property {function} resolve - Mark a task as resolved
 * @property {function} addDependencies - Add dependencies this task has to wait for
 * @property {function} addRelated - Add tasks that are related to this task
 */

/**
 * @param {HyralTask} task
 * @param {HyralRepository} repository
 * @param {function} resolveTask
 * @param {function} rejectTask
 */
function taskExecutor(task, repository, resolveTask, rejectTask) {
  if (task.resolved || task.claimed) {
    resolveTask();
    return;
  }

  task.claim();

  repository[task.type](task).then((response) => {
    task.resolve();

    if (task.type !== 'create' && task.type !== 'update') {
      resolveTask();
      return;
    }

    resetState(task.payload.stateStack);
    setState(task.payload.stateStack, response.data.data.state);
    resolveTask();
  }).catch(rejectTask);
}


/**
 * @param {string} type (create/update/delete/relation)
 * @param {HyralRepository} repository
 * @param {object} payload
 * @param {HyralResource|null} context
 *
 * @returns {HyralTask}
 */
export default function Task(type, repository, payload, context = null) {
  let resolved = false;

  let claimed = false;

  /**
   * @type {HyralTask[]}
   */
  let dependencies = [];

  /**
   * @type {HyralTask[]}
   */
  let related = [];

  let executionPromise = null;

  /**
   * @type {HyralTask}
   */
  const task = {
    get type() {
      return type;
    },
    get payload() {
      return payload;
    },
    get context() {
      return context;
    },
    get related() {
      return related;
    },
    get dependencies() {
      return dependencies;
    },
    get resolved() {
      return resolved;
    },
    get claimed() {
      return claimed;
    },
    claim() {
      claimed = true;
    },
    resolve() {
      resolved = true;
    },
    addDependencies(newDependencies) {
      dependencies = concat(dependencies, newDependencies);
    },
    addRelated(newRelated) {
      related = concat(related, newRelated);
    },
  };

  return Object.assign(task, {
    /**
     * @returns {Promise}
     */
    execute() {
      if (executionPromise) {
        return executionPromise;
      }

      executionPromise = new Promise((resolveTask, rejectTask) => {
        if (dependencies.length > 0) {
          Promise.all(
            dependencies.map(dependency => dependency.execute()),
          ).then(() => taskExecutor(task, repository, resolveTask, rejectTask)).catch(rejectTask);

          return;
        }

        taskExecutor(task, repository, resolveTask, rejectTask);
      });

      return executionPromise;
    },
  });
}
