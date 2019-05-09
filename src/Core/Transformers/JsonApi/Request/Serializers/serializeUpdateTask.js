import { isTask } from '../../../../Resource/Change/Inspection';
import serializeAttributes from './Helpers/serializeAttributes';
import serializeResourceRelationships
  from './Helpers/serializeResourceRelationships';

/**
 * @param {HyralTask} task
 *
 * @returns {HyralTask|object}
 */
export default function serializeUpdateTask(task) {
  if (!isTask(task)) {
    return task;
  }

  if (task.type !== 'update') {
    return task;
  }

  const serialized = {
    data: {
      id: task.payload.id.toString(),
      type: task.payload.type,
      attributes: serializeAttributes(task.payload),
    },
  };

  if (task.related && task.related.length > 0) {
    serialized.data.relationships = serializeResourceRelationships(task);
  }

  return serialized;
}
