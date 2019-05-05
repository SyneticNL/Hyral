/**
 * @typedef HyralTask
 * @type {Object}
 * @property {string} type
 * @property {object} payload
 * @property {object|null} context
 * @property {array} related
 * @property {array} dependencies
 * @property {object} metadata
 * @property {boolean} metadata.resolved
 */


export default function Task(type, payload, context = null) {
  return {
    type: 'add/update/remove/addRelation/removeRelation',
    /**
     * The payload for the task (the changed resource or the relation
     */
    payload,
    /**
     * The context. This is the resource on a relation update task.
     */
    context,
    /**
     * All tasks on this entity.
     */
    related: [],
    /**
     * Tasks that need to be executed and resolved before this task
     */
    dependencies: [],
    /**
     * Metadata on this task.
     */
    metadata: {
      resolved: false,
    },
  };
}
