import { repositoryManager } from '@hyral/core';
import { createVuexPlugin } from '@hyral/vue';
import { IContext, IMapping, IOptions } from '../__types__';
import { createRepositories } from './Init/Repository';
import { validateOptions, validateBaseUrl, validateMapping } from './Validators/Mapping';
import { loadMenuItems } from './Loaders/Menu';

/**
 * The plugin activates the VueX Plugin and loads menu items
 * @requires mapping
 * @see IMapping
 */
export default (options: IOptions<IMapping>) => ({ store }: IContext): void => {
  validateOptions(options);
  validateBaseUrl(options);
  validateMapping(options);
  const hyralService = options.name || 'drupal';

  // Create repositories
  createRepositories(options, repositoryManager);

  // Activate the store
  createVuexPlugin(repositoryManager, hyralService)(store);

  // Load the menu items
  loadMenuItems(options, hyralService, store);
};
