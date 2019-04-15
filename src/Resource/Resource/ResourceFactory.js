import Resource from './Resource';

/**
 * @param {string|number|null} id
 * @param {string} type
 * @param {object|null} data
 * @param {object|null} relationships
 * @param {object|null} metadata
 *
 * @returns {Resource}
 */
function createResource(id, type, data = null, relationships = null, metadata = null) {
  return new Resource(id, type, data, relationships, metadata);
}

export default createResource;
