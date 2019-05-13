import { resourceHasChanged, resourceIsNew } from '../Inspection';
import findTaskByPayload from './Helpers/findTaskByPayload';
import Task from './Task';
import {
  getAllRelatedResources,
  getChangedResourceRelations,
  getRelatedResources,
} from '../Relation/Relation';
import setTaskDependencies from './Helpers/setTaskDependencies';

export default function TaskGenerator(tasks, repositoryManager) {
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
      related.forEach(
        relatedResource => this.persistCascadeResource(relatedResource),
      );

      setTaskDependencies(tasks);
    },
    /**
     * Will queue an action to remove the entity.
     *
     * @param {HyralResource} resource
     */
    deleteResource(resource) {
      tasks.push(Task('delete', repositoryManager.getRepository(resource.type), resource));
    },
  };
}
