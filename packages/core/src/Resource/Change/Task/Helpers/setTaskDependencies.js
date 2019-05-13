import relatedTaskDependencies from './Dependencies/relatedTaskDependencies';
import createTaskDependencies from './Dependencies/createTaskDependencies';

/**
 * @param {HyralTask[]} tasks
 *
 * @returns {HyralTask[]}
 */
export default function setTaskDependencies(tasks) {
  const dependencySetters = [
    relatedTaskDependencies,
    createTaskDependencies,
  ];

  return tasks.map(
    task => dependencySetters.reduce(
      (reducedTask, dependencySetter) => dependencySetter(tasks, reducedTask),
      task,
    ),
  );
}
