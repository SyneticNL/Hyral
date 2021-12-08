import { repositoryManager } from '@hyral/core';
import { createVuexPlugin } from '@hyral/vue';
import { IContext, IMapping, IOptions } from '../__types__';
import { createRepositories } from './Init/Repository';
import { validateOptions, validateMapping } from './Validators/Options';

/**
 * The plugin activates the VueX Plugin and loads menu items
 * @requires mapping
 * @see IMapping
 */
export default (options: IOptions<IMapping>) => ({ store, app }: IContext): void => {
  validateOptions(options);
  validateMapping(options);
  const hyralService = options.name || 'drupal';
  const requestConfig = app.$config.hyralAxiosConfig;

  // Create repositories
  createRepositories(options, requestConfig, repositoryManager);

  // Activate the store
  createVuexPlugin(repositoryManager, hyralService)(store);
};
