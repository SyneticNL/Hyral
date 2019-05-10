import { isTask } from '../../../../../core/src/Resource/Change/Inspection';
import serializeAttributes from './Helpers/serializeAttributes';
import serializeResourceRelationships from './Helpers/serializeResourceRelationships';

/**
 * @param {HyralTask} task
 *
 * @returns {HyralTask|object}
 */
export default function serializeCreateUpdateTask(task) {
  if (!isTask(task)) {
    return task;
  }

  if (task.type !== 'create' && task.type !== 'update') {
    return task;
  }

  const type = { type: task.payload.type };
  const id = task.payload.id !== null ? { id: task.payload.id.toString() } : {};
  const attributes = { attributes: serializeAttributes(task.payload) };
  const relationships = task.related && task.related.length > 0
    ? { relationships: serializeResourceRelationships(task) }
    : {};

  return {
    data: Object.assign(
      {},
      type,
      id,
      attributes,
      relationships,
    ),
  };
}
