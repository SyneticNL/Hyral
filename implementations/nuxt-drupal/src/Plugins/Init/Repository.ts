import { HttpConnector, IRepositoryManager } from '@hyral/core';
import jsonApi from '@hyral/json-api';
import axios from 'axios';
import { IMapping, IOptions } from '../../__types__';

/**
 * Creates the repositories from the mapping
 */
// eslint-disable-next-line import/prefer-default-export
export const createRepositories = (options: IOptions<IMapping>, repositoryManager: IRepositoryManager): void => {
  const axiosInstance = axios.create({ baseURL: `${options.baseUrl}/jsonapi` });
  const connector = new HttpConnector(axiosInstance, jsonApi);

  const repositories = Object.keys(options.mapping);

  repositories.forEach((type) => repositoryManager.createRepository(connector, type));
};
