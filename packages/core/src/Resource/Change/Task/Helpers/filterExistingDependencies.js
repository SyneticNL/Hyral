
export default function filterExistingDependencies(task, dependantTasks) {
  return dependantTasks.filter(
    dependantTask => !task.dependencies.includes(dependantTask),
  );
}
