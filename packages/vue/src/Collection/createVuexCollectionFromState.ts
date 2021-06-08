import { Collection, Repository, Resource } from '@hyral/core';
import { IState } from '../__types__';

export default function createVuexCollectionFromState(name: string, state: IState, repository: Repository<any>): Collection<any> {
  const collection = new Collection(name, repository);
  const { data } = state.collections[repository.resourceType][name];

  collection.data = data as unknown as Resource<unknown>[];

  return collection;
}
