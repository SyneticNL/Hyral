import concat from 'lodash/concat';

/**
 * @typedef HyralTask
 *
 * @type {Object}
 * @property {object} payload - The payload for the task (the changed resource or the relation)
 * @property {object|null} context - The context. This is the resource on a relation task.
 * @property {array} related - All tasks on this entity.
 * @property {array} dependencies - Tasks that need to be executed and resolved before this task.
 * @property {boolean} resolved - If the task has been resolved.
 * @property {boolean} claimed - If the task has been claimed.
 * @property {function} execute
 */

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

  let dependencies = [];
  let related = [];

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
    get resolved() {
      return resolved;
    },
    get related() {
      return related;
    },
    get dependencies() {
      return dependencies;
    },
    addDependencies(newDependencies) {
      dependencies = concat(dependencies, newDependencies);
    },
    addRelated(newRelated) {
      related = concat(related, newRelated);
    },
    claimed: false,
  };

  return Object.assign(task, {
    /**
     * @returns {Promise}
     */
    execute() {
      return repository[type](task).then(() => {
        resolved = true;
      });
    },
  });
}
