/**
 * @param {HyralTask} task
 * @returns {Object|HyralTask}
 */
import { isTask } from '../../../../Resource/Change/Inspection';
import serializeAttributes from './Helpers/serializeAttributes';
import serializeResourceRelationships
  from './Helpers/serializeResourceRelationships';

/**
 * @param {HyralTask} task
 *
 * @returns {HyralTask|object}
 */
export default function serializeCreateTask(task) {
  if (!isTask(task)) {
    return task;
  }

  if (task.type !== 'create') {
    return task;
  }

  const serialized = {
    data: {
      type: task.payload.type.toString(),
      attributes: serializeAttributes(task.payload),
    },
  };

  if (task.related && task.related.length > 0) {
    serialized.data.relationships = serializeResourceRelationships(task);
  }

  return serialized;
}
