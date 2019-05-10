/**
 * @param {HyralTask} task
 * @returns {Object|HyralTask}
 */
import serializeAttributes from './serializeAttributes';
import serializeResourceRelationships from './serializeResourceRelationships';

/**
 * @param {HyralTask} task
 *
 * @returns {HyralTask|object}
 */
export default function serializeResource(task) {
  return {
    data: Object.assign(
      {},
      { type: task.payload.type },
      task.payload.id !== null ? { id: task.payload.id.toString() } : {},
      { attributes: serializeAttributes(task.payload) },
      task.related && task.related.length > 0
        ? { relationships: serializeResourceRelationships(task) }
        : {},
    ),
  };
}
