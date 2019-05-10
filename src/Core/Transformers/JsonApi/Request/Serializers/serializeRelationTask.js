import head from 'lodash/head';
import { isTask } from '../../../../Resource/Change/Inspection';
import serializeRelationship from './Helpers/serializeRelationship';

/**
 * @param {HyralTask} task
 *
 * @returns {HyralTask|object}
 */
export default function serializeRelationTask(task) {
  if (!isTask(task)) {
    return task;
  }

  if (task.type !== 'relation') {
    return task;
  }

  if (!task.payload.resources || task.payload.resources.length === 0) {
    return {
      data: null,
    };
  }

  return {
    data: task.context.relationships[task.payload.relation].many
      ? task.payload.resources.map(serializeRelationship)
      : serializeRelationship(head(task.payload.resources)),
  };
}
