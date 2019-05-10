import omit from 'lodash/omit';

/**
 * @param {HyralResource} resource
 *
 * @returns {object}
 */
export default function serializeAttributes(resource) {
  return omit(resource.data, Object.keys(resource.relationships));
}
