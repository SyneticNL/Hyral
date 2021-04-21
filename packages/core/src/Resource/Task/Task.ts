import { IRepository, IResource, ITask } from '../../__types__';

/**
 * Task is the object used in the repository for mutation queries
 */
export default class Task<T> implements ITask<T> {
  type: 'create' | 'update' | 'delete';
  repository: IRepository<T>;
  payload: IResource<T>;
  context?: IResource<T>;

  constructor(
    type: 'create' | 'update' | 'delete',
    repository: IRepository<T>,
    payload: IResource<T>,
    context?: IResource<T>,
  ) {
    this.type = type;
    this.repository = repository;
    this.payload = payload;
    this.context = context;
  }
}
