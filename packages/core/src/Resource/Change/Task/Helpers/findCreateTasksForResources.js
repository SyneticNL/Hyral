import { resourceIsNew } from '../../Inspection';
import findTaskByPayload from './findTaskByPayload';

export default function findCreateTasksForResources(tasks, resources) {
  if (!resources) {
    return [];
  }

  return resources
    .filter(resource => resourceIsNew(resource))
    .map(resource => findTaskByPayload(tasks, resource))
    .filter(relationCreateTask => typeof relationCreateTask !== 'undefined');
}
