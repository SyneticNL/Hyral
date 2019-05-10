
/**
 * @param {HyralTask[]} tasks
 * @param {object} payload
 *
 * @returns {HyralTask|undefined}
 */
export default function findTaskByPayload(tasks, payload) {
  return tasks.find(task => Object.is(task.payload, payload));
}
