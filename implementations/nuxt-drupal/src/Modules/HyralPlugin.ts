import { createVuexPlugin } from '@hyral/vue';
import { repositoryManager, HttpConnector } from '@hyral/core';
import jsonApi from '@hyral/json-api';
import axios from 'axios';

import { IContext } from '../__types__';

/**
 * Creates the repositories and registers them in the store
 * Is exposed during building.
 */
export default ({ store }: IContext): void => {
  // TODO: How do I test this?
  // This is to pick up the options passed along to the addPlugin method in the module passed along to the nuxt.config.js
  const { repositories, baseUrl } = JSON.parse('<%= JSON.stringify(options) %>') as { repositories: string[], baseUrl: string };
  const axiosInstance = axios.create({ baseURL: `${baseUrl}/jsonapi` });
  const connector = new HttpConnector(axiosInstance, jsonApi);

  repositories.forEach((type) => repositoryManager.createRepository(connector, type));
  createVuexPlugin(repositoryManager, 'drupal')(store);
};
