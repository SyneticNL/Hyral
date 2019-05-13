
export default function findCreateTasksForResources(task, tasks) {
  return tasks.filter(
    relationCreateTask => typeof task.dependencies.find(
      dependency => Object.is(relationCreateTask, dependency),
    ) === 'undefined',
  );
}
