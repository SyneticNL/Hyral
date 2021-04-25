import { IMapping, IOptions } from '../../__types__';

/**
 * Checks the validity of the options
 */
export const validateOptions = (options: IOptions<IMapping>): void => {
  if (!options) throw new Error('DrupalNuxtPlugin requires options as a parameter');
};

/**
 * Checks the validity of the baseUrl
 */
export const validateBaseUrl = (options: IOptions<IMapping>): void => {
  if (!options.baseUrl) throw new Error('DrupalNuxtPlugin requires a baseUrl in options');
};

/**
 * Checks the validity of the mapping.
 *
 * IMapping: { nodes: [], menus: [], entities: {}}
 */
export const validateMapping = (options: IOptions<IMapping>): void => {
  const { mapping } = options;

  if (!mapping) {
    throw new Error('DrupalNuxtPlugin requires a mapping in options');
  }

  if (!mapping.entities || !mapping.menus || !mapping.nodes) {
    throw new Error('DrupalNuxtPlugin requires a nodes, menus and entities attribute');
  }

  if (!Array.isArray(mapping.nodes) || !Array.isArray(mapping.menus)) {
    throw new Error('DrupalNuxtPlugin requires nodes and menus as array');
  }

  if (Array.isArray(mapping.entities)) {
    throw new Error('DrupalNuxtPlugin requires entities to be a record');
  }
};
