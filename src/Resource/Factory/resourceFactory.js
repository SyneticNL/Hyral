/**
 * @typedef HyralResource
 *
 * @type {Object}
 * @property {string|number|null} [id] - The resource id
 * @property {string} type - The resource type
 * @property {object} data - The resource data
 * @property {object} metadata - The resource metadata
 * @property {Boolean} metadata.loaded - Loaded state.
 * @property {Boolean} metadata.loading - Loading state.
 * @property {Object} metadata.relationships - Available relationships
 */

/**
 * @param {string|number|null} id
 * @param {string} type
 * @param {object|null} data
 *
 * @returns {HyralResource}
 */
export default function resourceFactory(id, type, data = null) {
  return {
    id,
    type,
    data: data || {},
    metadata: {
      loaded: data !== null,
      loading: false,
      relationships: {},
    },
  };
}
