import findCreateTasksForResources from '../findCreateTasksForResources';
import filterExistingDependencies from '../filterExistingDependencies';

export default function relatedTaskDependencies(tasks, task) {
  if (task.type !== 'relation') {
    return task;
  }

  const filteredDependencies = filterExistingDependencies(
    task,
    findCreateTasksForResources(tasks, task.payload.resources),
  );

  if (!filteredDependencies || filteredDependencies.length === 0) {
    return task;
  }

  task.addDependencies(filteredDependencies);

  return task;
}
