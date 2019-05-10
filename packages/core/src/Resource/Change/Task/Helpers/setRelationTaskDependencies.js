import { resourceIsNew } from '../../Inspection';
import findTaskByPayload from './findTaskByPayload';

/**
 * @param {HyralTask[]} tasks
 *
 * @returns {HyralTask[]}
 */
export default function setRelationTaskDependencies(tasks) {
  return tasks.map((task) => {
    if (task.type !== 'relation') {
      return task;
    }

    const newResources = task.payload.resources.filter(resource => resourceIsNew(resource));

    const newResourceTasks = newResources
      .map(resource => findTaskByPayload(tasks, resource))
      .filter(relationCreateTask => typeof relationCreateTask !== 'undefined');

    const newCreateTaskDependencies = newResourceTasks.filter(
      relationCreateTask => typeof task.dependencies.find(
        dependency => Object.is(relationCreateTask, dependency),
      ) === 'undefined',
    );

    if (!newCreateTaskDependencies || newCreateTaskDependencies.length === 0) {
      return task;
    }

    task.addDependencies(newCreateTaskDependencies);

    return task;
  });
}
