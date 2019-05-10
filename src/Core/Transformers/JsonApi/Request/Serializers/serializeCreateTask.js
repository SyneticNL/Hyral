/**
 * @param {HyralTask} task
 * @returns {Object|HyralTask}
 */
import { isTask } from '../../../../Resource/Change/Inspection';
import serializeResource from './Helpers/serializeResource';

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

  return serializeResource(task);
}
