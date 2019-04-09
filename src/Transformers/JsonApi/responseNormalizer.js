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
 *
 */

/**
 * @param {JsonApiResponse} response
 *
 * @returns {{data: HyralResource[]|HyralResource, paging: {count: number, pages: number}}}
 */
export default function responseNormalizer(response) {
  if (response.errors) {
    return response;
  }
  const singleMode = !Array.isArray(response.data);

  const includedResources = response.included ? normalizeResources(response.included) : {};
  relationshipApplyToData(includedResources, includedResources);

  const rootResources = normalizeResources(singleMode ? [response.data] : response.data);
  relationshipApplyToData(rootResources, includedResources);

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
