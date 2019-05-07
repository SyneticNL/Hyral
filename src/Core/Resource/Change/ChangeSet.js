import Task from './Task/Task';
import { resourceHasChanged, resourceIsNew } from './Inspection';
import { getChangedResourceRelations, getRelatedResources } from './Relation/Relation';

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
 *
 * @param {HyralResourceManager} repositoryManager
 *
 * @returns {HyralChangeSet}
 *
 * @constructor
 */
export default function ChangeSet(repositoryManager) {
  const tasks = [];

  return {
    /**
     * Will queue a list of tasks for data/relation changes to the entity itself.
     *
     * @param {HyralResource} resource
     */
    persistResource(resource) {
      if (!resourceHasChanged(resource) && !resourceIsNew(resource)) {
        return;
      }

      const task = Task(resourceIsNew(resource) ? 'create' : 'update', repositoryManager.getRepository(resource.type), resource);

      getChangedResourceRelations(resource).forEach((relation) => {
        const relationTask = Task('relation', repositoryManager.getRepository(resource.type), relation, resource);
        relationTask.dependencies.push(task);

        task.related.push(relationTask);

        tasks.push(relationTask);
      });

      tasks.push(task);
    },

    /**
     * Queue a list of tasks for data/relation changes to the entity and its related entities.
     *
     * @param {HyralResource} resource
     */
    persistCascadeResource(resource) {
      this.persistResource(resource);

      getRelatedResources(resource).map(
        relatedResource => this.persistCascadeResource(relatedResource),
      );
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
        tasks.sort().map((task) => {
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
