/**
 * A Resource defines a single item / entity from the backend
 */
import { IResource, IResourceRelationship } from '../__types__';

export default class Resource<T> implements IResource<T> {
  id: string | number | null;
  type: string;
  data: T;
  relationships: IResourceRelationship;
  meta?: Record<string, any>;

  constructor(
    id: string | number | null,
    type: string,
    data?: T,
    relationships?: IResourceRelationship | null,
    meta?: Record<string, any>,
  ) {
    this.id = id;
    this.type = type;
    this.data = data || ({} as T);
    this.relationships = relationships || {};
    this.meta = meta;
  }
}
