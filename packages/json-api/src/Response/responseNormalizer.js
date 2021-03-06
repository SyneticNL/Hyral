import normalizeResources from './Resource/normalizeResources';
import relationshipApplyToData from './Resource/Relationship/relationshipApplyToData';
import normalizePaging from './Resource/normalizePaging';

/**
 * @typedef JsonApiResponse
 *
 * @type {Object}
 * @property {JsonApiResource[]} included
 * @property {JsonApiResource[]} data
 * @property {Object} links
 * @property {String} links.self
 * @property {String} links.prev
 * @property {String} links.next
 * @property {String} links.first
 * @property {String} links.last
 * @property {Object} jsonapi
 * @property {String} jsonapi.version
 * @property {Object} metadata
 *
 */

/**
 * @typedef JsonApiResource
 *
 * @type {Object}
 * @property {String|Number} id
 * @property {String} type
 * @property {Object} attributes
 * @property {Object} relationships
 * @property {Object} meta
 */

/**
 * @param {Object} ResourcesObject
 */
function ensureResourceSingleStateInStack(ResourcesObject) {
  Object.values(ResourcesObject).forEach(resource => resource.resetStateStack());
}

/**
 * @param {JsonApiResponse} response
 *
 * @returns {{data: Resource[]|Resource, paging: {count: number, pages: number}}|{data: Resource}}
 */
function responseNormalizer(response) {
  if (response.errors) {
    return response;
  }

  if (!response.data) {
    return response;
  }

  const singleMode = !Array.isArray(response.data);

  const includedResources = response.included ? normalizeResources(response.included) : {};
  relationshipApplyToData(includedResources, includedResources);

  const rootResources = normalizeResources(singleMode ? [response.data] : response.data);
  relationshipApplyToData(rootResources, includedResources);

  ensureResourceSingleStateInStack(includedResources);
  ensureResourceSingleStateInStack(rootResources);

  const normalizedItems = Object.values(rootResources);
  if (singleMode) {
    return {
      data: normalizedItems.shift(),
    };
  }

  return {
    data: normalizedItems,
    paging: normalizePaging(response),
  };
}

responseNormalizer.responseType = 'json';

export default responseNormalizer;
