import { resolve } from 'path';
import DruxtRouterModule from 'druxt-router';
import { INuxtContext, IOptions } from '../__types__';

/**
 * Activates the different options from the module and injects them into the application
 * @param moduleOptions: { mapping, baseUrl }
 */
export default async function DrupalNuxtModule(this: INuxtContext, options: IOptions): Promise<void> {
  if (!(this.addPlugin && this.requireModule)) {
    return Promise.reject(new Error('Make sure to use the DrupalNuxtModule in a Nuxt environment'));
  }

  if (!options.mapping) {
    return Promise.reject(new Error('DrupalNuxtModule requires a mapping in moduleOptions'));
  }

  if (!options.baseUrl) {
    return Promise.reject(new Error('DrupalNuxtModule requires a baseUrl in moduleOptions'));
  }

  const repositories = [
    ...options.mapping.nodes,
    ...options.mapping.menus,
    ...Object.keys(options.mapping.entities),
  ];

  const { baseUrl } = options;

  // Add the repositories
  this.addPlugin({
    src: resolve(__dirname, 'HyralPlugin.js'),
    fileName: 'hyral-plugin.js',
    options: { repositories, baseUrl },
  });

  // Add druxt-router module
  await this.requireModule(DruxtRouterModule, true);
}
