import { getAllRelatedResources } from '../../../Relation/Relation';
import filterNewDependencyTasks from '../filterNewDependencyTasks';
import findCreateTasksForResources from '../findCreateTasksForResources';

export default function createTaskDependencies(tasks, task) {
  if (task.type !== 'create' && task.type !== 'update') {
    return task;
  }

  const related = getAllRelatedResources(task.payload);

  const newCreateTaskDependencies = filterNewDependencyTasks(
    task,
    findCreateTasksForResources(tasks, related),
  );

  if (!newCreateTaskDependencies || newCreateTaskDependencies.length === 0) {
    return task;
  }

  task.addDependencies(newCreateTaskDependencies);

  return task;
}
