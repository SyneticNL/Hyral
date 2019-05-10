/**
 * @param {HyralTask} task
 *
 * @returns {{type, id}}
 */
import serializeRelationTask from '../serializeRelationTask';

export default function serializeResourceRelationships(task) {
  return task.related
    .reduce((serialized, relatedTask) => {
      relatedTask.claim();

      return Object.assign(serialized, {
        [relatedTask.payload.relation]: serializeRelationTask(relatedTask),
      });
    }, {});
}
