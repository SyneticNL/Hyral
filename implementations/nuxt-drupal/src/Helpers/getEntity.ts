import isFunction from 'lodash/isFunction';
import { AsyncComponent, Component } from 'vue';
import { IMapping } from '../__types__';

/**
 * Returns the component from the mapping according to the name of the component type
 *
 * @requires this.mapping Throws error if this.mapping is not present
 * @see this.mapping.fallback Returns renderless fallback component if name not found and mapping.fallback is not present
 */
export default (name?: string, mapping?: IMapping, viewMode = 'default'): AsyncComponent | Component | null => {
  // If no mapping is present
  if (!mapping) {
    throw new Error('No computed mapping found');
  }

  // If the component is not found, return mapped fallback or renderless
  if (!name || !(name in mapping)) {
    return mapping.fallback
      ? mapping.fallback
      : null;
  }

  const mappingAsObject = mapping[name] as Record<string, AsyncComponent>;
  const mappingIsFunction = isFunction(mappingAsObject);

  // If mapping is function
  if (mappingIsFunction) {
    return mapping[name];
  }

  // If no default is present
  if (!mappingAsObject[viewMode]) {
    throw new Error(`No '${viewMode}' view mode value present in ${name} mapping.`);
  }

  return mappingAsObject[viewMode];
};
