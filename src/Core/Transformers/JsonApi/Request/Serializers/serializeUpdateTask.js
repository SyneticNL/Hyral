import { isTask } from '../../../../Resource/Change/Inspection';
import serializeResource from './Helpers/serializeResource';

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

  return serializeResource(task);
}
