import { ResponseType } from 'axios';

// =====
// TYPES
// =====
export type IFilter = { field: string, value: string };
export type ISorting = { field: string, direction?: string };
export type IPaging = Record<string, unknown>;
export type IParams = Record<string, unknown>;

export type IResourceRelationship = Record<string, { resource: string; cardinality: string; many?: boolean; }>;

export type ITaskType = 'create' | 'update' | 'delete';

export type IAxiosResponseType = ResponseType;

export type INormalizedResponse<T> = {
  data: IResource<T> | IResource<T>[],
  paging?: { count: number, pages: number }
};

export type IResponse<T> = { data: INormalizedResponse<T> };
export type ISerializers<T> = {
  urlSerializer: IUrlSerializer<T>,
  paramsSerializer: IParamsSerializer<T>,
  requestSerializer: IRequestSerializer<T>,
  responseNormalizer: IResponseNormalizer
};

// ==========
// INTERFACES
// ==========

// -------
// OBJECTS
// -------
export interface ICollection<T> {
  name: string;
  repository: IRepository<T>;
  data: IResource<T>[];
  parameterBag: IParameterBag;

  length: number;
  items: IResource<T>[];
  load(): Promise<void>;
}

export interface IConnector<T> {
  fetch(repository: IRepository<T>, parameterBag?: IParameterBag): Promise<IResponse<T>>;
  fetchOne(repository: IRepository<T>, id: string | number, parameterBag?: IParameterBag): Promise<IResponse<T>>;
  create(task: ITask<T>): Promise<IResponse<T>>;
  update(task: ITask<T>): Promise<IResponse<T>>;
  delete(task: ITask<T>): Promise<void>;
}

export interface IParameterBag {
  addFilter(filter: IFilter): void;
  setFilters(filters: IFilter[]): void;
  setSorting(sorting: ISorting[]): void;
  setPaging(paging: Record<string, unknown>): void;
  addParam(key: string, value: Record<string, unknown>): void;
  setParams(params: Record<string, unknown>): void;
}

export interface IRepository<T> {
  connector: IConnector<T>;
  resourceType: string;
  identifier: string;

  find(parameterBag?: IParameterBag): Promise<IResource<T>[]>;
  findOne(parameterBag?: IParameterBag): Promise<IResource<T> | null>;
  findById(id: string | number, parameterBag?: IParameterBag): Promise<IResource<T> | null>;
  create(task: ITask<T>): Promise<IResponse<T>>;
  update(task: ITask<T>): Promise<IResponse<T>>;
  delete(task: ITask<T>): Promise<void>;
}

export interface IRepositoryManager {
  repositories: Record<string, IRepository<any>>;
  createRepository<T>(connector: IConnector<T>, resourceType: string, identifier?: string): IRepository<T>;
  addRepository(repository: IRepository<any>): void;
  getRepository<T>(resourceType: string): IRepository<T> | null;
  getRepositories(): Record<string, IRepository<any>>;
}

export interface IResource<T> {
  id: string | number | null;
  type: string;
  data: T;
  relationships: IResourceRelationship;
  meta?: Record<string, any>;
}

export interface ITask<T> {
  type: ITaskType;
  repository: IRepository<T>;
  payload: IResource<T>;
  context?: IResource<T>;
}

// -------------------------
// SERIALIZERS & NORMALIZERS
// -------------------------
export interface IParamsSerializer<T> {
  (params?: T | null): string;
}

export interface IRequestSerializer<T> {
  (task: ITask<T>): any;
}

export interface IResponseNormalizer {
  responseType: IAxiosResponseType;
  (data: any): { data: any };
}

export interface IUrlSerializer<T> {
  fetch(repository: IRepository<T>): string;
  fetchOne(repository: IRepository<T>, id: string | number): string;
  create(resourceType: string): string;
  update(resourceType: string, id: string | number | null): string;
  delete(resourceType: string, id: string | number | null): string;
}
