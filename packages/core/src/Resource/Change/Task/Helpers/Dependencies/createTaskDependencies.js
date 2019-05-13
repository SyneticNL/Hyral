import { getAllRelatedResources } from '../../../Relation/Relation';
import filterExistingDependencies from '../filterExistingDependencies';
import findCreateTasksForResources from '../findCreateTasksForResources';

export default function createTaskDependencies(tasks, task) {
  if (task.type !== 'create' && task.type !== 'update') {
    return task;
  }

  const related = getAllRelatedResources(task.payload);

  const filteredDependencies = filterExistingDependencies(
    task,
    findCreateTasksForResources(tasks, related),
  );

  if (!filteredDependencies || filteredDependencies.length === 0) {
    return task;
  }

  task.addDependencies(filteredDependencies);

  return task;
}
