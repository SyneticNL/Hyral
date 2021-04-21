import {
  IConnector,
  IRepository,
  IParameterBag,
  IResource,
  ITask,
  IResponse,
} from '../__types__';

/**
 * For each type of Resource a Repository must be created.
 * When fetching resources for a resource type you can use the repository methods.
 */
export default class Repository<T> implements IRepository<T> {
  connector: IConnector<T>;
  resourceType: string;
  identifier: string;

  constructor(connector: IConnector<T>, resourceType: string, identifier: string) {
    this.connector = connector;
    this.resourceType = resourceType;
    this.identifier = identifier;
    Object.freeze(this);
  }

  async find(parameterBag?: IParameterBag): Promise<IResource<T>[]> {
    const response = await this.connector.fetch(this, parameterBag);
    return (response.data.data instanceof Array) ? response.data.data : [response.data.data];
  }

  async findOne(parameterBag?: IParameterBag): Promise<IResource<T> | null> {
    const response = await this.connector.fetch(this, parameterBag) as { data: { data: IResource<T>[] } };
    return ((response && response.data && response.data.data) ? response.data.data[0] : null);
  }

  async findById(id: string | number, parameterBag?: IParameterBag): Promise<IResource<T> | null> {
    const response = await this.connector.fetchOne(this, id, parameterBag) as { data: { data: IResource<T> } };
    return ((response && response.data && response.data) ? response.data.data : null);
  }

  async create(task: ITask<T>): Promise<IResponse<T>> {
    return this.connector.create(task);
  }

  async update(task: ITask<T>): Promise<IResponse<T>> {
    return this.connector.update(task);
  }

  async delete(task: ITask<T>): Promise<void> {
    return this.connector.delete(task);
  }
}
