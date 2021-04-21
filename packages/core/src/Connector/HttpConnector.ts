import { AxiosInstance, AxiosStatic } from 'axios';
import {
  IConnector,
  IParameterBag,
  IRepository,
  ITask,
  IResponse,
  ISerializers,
} from '../__types__';

/**
 * The connector defines the protocol Hyral should use to communicate with
 */
export default class HttpConnector<T> implements IConnector<T> {
  axios: AxiosInstance;
  serializers: ISerializers<T>;

  constructor(
    axios: AxiosStatic | AxiosInstance,
    serializers: ISerializers<T>,
  ) {
    this.axios = 'create' in axios ? axios.create() : axios;
    this.serializers = serializers;

    this.axios.defaults.responseType = this.serializers.responseNormalizer.responseType || 'json';
    this.axios.defaults.paramsSerializer = this.serializers.paramsSerializer;
  }

  async fetch(
    repository: IRepository<T>,
    parameterBag?: IParameterBag,
  ): Promise<IResponse<T>> {
    const response = await this.axios.get(this.serializers.urlSerializer.fetch(repository), {
      params: parameterBag,
    });

    return {
      ...response,
      data: this.serializers.responseNormalizer(response.data),
    };
  }

  async fetchOne(
    repository: IRepository<T>,
    id: string | number,
    parameterBag?: IParameterBag,
  ): Promise<IResponse<T>> {
    const response = await this.axios.get(this.serializers.urlSerializer.fetchOne(repository, id), {
      params: parameterBag,
    });

    return {
      ...response,
      data: this.serializers.responseNormalizer(response.data),
    };
  }

  async create(task: ITask<T>): Promise<IResponse<T>> {
    const response = await this.axios.post(
      this.serializers.urlSerializer.create(task.payload.type),
      this.serializers.requestSerializer(task),
    );

    return {
      ...response,
      data: this.serializers.responseNormalizer(response.data),
    };
  }

  async update(task: ITask<T>): Promise<IResponse<T>> {
    const response = await this.axios.patch(
      this.serializers.urlSerializer.update(task.payload.type, task.payload.id),
      this.serializers.requestSerializer(task),
    );

    return {
      ...response,
      data: this.serializers.responseNormalizer(response.data),
    };
  }

  async delete(task: ITask<T>): Promise<void> {
    await this.axios.delete(this.serializers.urlSerializer.delete(task.payload.type, task.payload.id));
  }
}
