/**
 * @typedef HyralActions
 * @type {Object}
 * @property {array} tasks - Tasklist
 * @property {function} addTask - Add a task
 */
import Task from './Actions/Task/Task';

/**
 *
 * @param resource
 * @returns {HyralTask[]}
 */
function getRelatedResources(resource) {
  return [];
}

function addTask(tasks, newTask) {
  tasks.push(newTask);
}

function addTasks(tasks, newTasks) {
  newTasks.forEach(tasks.push);
}

/**
 * Entity with changes to data, added and removed relationship. Relation that has been updated.
 *
 * Task - update, payload: { book: 2 }
 * Task - relationAdd, payload: { relation: { type: 1-* }, data: { author, 2 } }, context: { book: 2 }, parent: task::update
 * Task - relationRemove, payload: {relation: {type: 1-1 }, data: { location: 3 }}, parent: task::update
 * Task - update, payload: { author: 2 }, context: { book: 2 }, parent: task::update
 */
export default function Actions() {
  const tasks = [];

  return {
    /**
     * Will queue a list of tasks for data/relation changes to the entity itself.
     *
     * @param {HyralResource} resource
     *
     * @returns {HyralTask}
     */
    persistResource(resource) {
      const task = Task('', resource);

      // Validate added/removed relations.

      tasks.push(task);

      return task;
    },

    /**
   * Will queue a list of tasks for data/relation changes to the entity and its related entities.
   *
   * @param {HyralResource} resource
   *
   * @returns {HyralTask}
   */
    persistCascadeResource(resource) {
      const task = this.persistResource(resource);

      getRelatedResources(resource).map(
        relatedResource => this.persistCascadeResource(relatedResource),
      );

      return task;
    },

    /**
   * Will queue an action to remove the entity.
   *
   * @param {HyralResource} resource
   */
    deleteResource(resource) {
      tasks.push(Task('delete', resource));
    },

    /**
   * Executes all actions.
   *
   * @return {Promise}
   */
    execute() {
      return Promise.all(
        tasks.sort().map(task => task.execute()),
      );
    },

    /**
   * Returns a object describing the current status of the flush action.
   */
    status() {
      return {
        tasks: [],
        currentTask: {},
        total: 0,
        resolved: 0,
      };
    },
  };
}
