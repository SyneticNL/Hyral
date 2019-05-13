import { resourceIsNew } from '../../Inspection';
import findTaskByPayload from './findTaskByPayload';

export default function findCreateTasksForResources(tasks, resources) {
  if (!resources) {
    return [];
  }

  const newResources = resources.filter(resource => resourceIsNew(resource));

  return newResources
    .map(resource => findTaskByPayload(tasks, resource))
    .filter(relationCreateTask => typeof relationCreateTask !== 'undefined');
}
