import findCreateTasksForResources from '../findCreateTasksForResources';
import filterNewDependencyTasks from '../filterNewDependencyTasks';

export default function relatedTaskDependencies(tasks, task) {
  if (task.type !== 'relation') {
    return task;
  }

  const newCreateTaskDependencies = filterNewDependencyTasks(
    task,
    findCreateTasksForResources(tasks, task.payload.resources),
  );

  if (!newCreateTaskDependencies || newCreateTaskDependencies.length === 0) {
    return task;
  }

  task.addDependencies(newCreateTaskDependencies);

  return task;
}
