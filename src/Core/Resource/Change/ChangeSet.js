import Task from './Task/Task';
import { resourceHasChanged, resourceIsNew } from './Inspection';
import {
  getChangedResourceRelations,
  getAllRelatedResources,
  getRelatedResources,
} from './Relation/Relation';

/**
 * @typedef HyralChangeSet
 *
 * @type {Object}
 * @property {function} persistResource
 * @property {function} persistCascadeResource
 * @property {function} deleteResource
 * @property {function} execute
 * @property {function} status
 */

/**
 * @param {HyralTask[]} tasks
 * @param {object} payload
 *
 * @returns {HyralTask|undefined}
 */
function findTaskByPayload(tasks, payload) {
  return tasks.find(task => Object.is(task.payload, payload));
}

/**
 * @param {HyralTask[]} tasks
 *
 * @returns HyralTask[]}
 */
function setRelationTaskDependencies(tasks) {
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

/**
 *
 * @param {HyralResourceManager} repositoryManager
 *
 * @returns {HyralChangeSet}
 *
 * @constructor
 */
export default function ChangeSet(repositoryManager) {
  /** @type {HyralTask[]} */
  const tasks = [];

  return {
    get tasks() {
      return tasks;
    },

    /**
     * Will queue a list of tasks for data/relation changes to the entity itself.
     *
     * @param {HyralResource} resource
     */
    persistResource(resource) {
      if (!resourceHasChanged(resource) && !resourceIsNew(resource)) {
        return;
      }

      if (findTaskByPayload(tasks, resource)) {
        return;
      }

      const task = Task(resourceIsNew(resource) ? 'create' : 'update', repositoryManager.getRepository(resource.type), resource);
      tasks.push(task);

      getChangedResourceRelations(resource).forEach((relation) => {
        const relationTask = Task(
          'relation',
          repositoryManager.getRepository(resource.type),
          {
            relation,
            resources: getRelatedResources(resource, relation),
          },
          resource,
        );

        if (resourceIsNew(resource)) {
          relationTask.addDependencies([task]);
        }

        tasks.push(relationTask);

        task.addRelated([relationTask]);
      });
    },

    /**
     * Queue a list of tasks for data/relation changes to the entity and its related entities.
     *
     * @param {HyralResource} resource
     */
    persistCascadeResource(resource) {
      this.persistResource(resource);
      const related = getAllRelatedResources(resource);
      related.map(
        relatedResource => this.persistCascadeResource(relatedResource),
      );

      setRelationTaskDependencies(tasks);
    },

    /**
     * Will queue an action to remove the entity.
     *
     * @param {HyralResource} resource
     */
    deleteResource(resource) {
      tasks.push(Task('delete', repositoryManager.getRepository(resource.type), resource));
    },
    /**
     * Executes all actions.
     *
     * @return {Promise}
     */
    execute() {
      return Promise.all(
        tasks
          .sort((a, b) => b.related.length - a.related.length)
          .map((task) => {
            if (task.resolved || task.claimed) {
              return Promise.resolve();
            }

            return task.execute();
          }),
      );
    },

    /**
     * Returns a object describing the current status of the flush action.
     */
    status() {
      return {
        total: tasks.length,
        resolved: tasks.filter(task => task.metadata.resolved).length,
      };
    },
  };
}
