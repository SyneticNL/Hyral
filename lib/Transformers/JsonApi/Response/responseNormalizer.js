"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=responseNormalizer;var _normalizeResources=_interopRequireDefault(require("./Resource/normalizeResources")),_relationshipApplyToData=_interopRequireDefault(require("./Resource/Relationship/relationshipApplyToData")),_normalizePaging=_interopRequireDefault(require("./Resource/normalizePaging"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
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
 */ /**
 * @typedef JsonApiResource
 *
 * @type {Object}
 * @property {String|Number} id
 * @property {String} type
 * @property {Object} attributes
 * @property {Object} relationships
 *
 */ /**
 * @param {JsonApiResponse} response
 *
 * @returns {{data: Resource[]|Resource, paging: {count: number, pages: number}}|{data: Resource}}
 */function responseNormalizer(a){if(a.errors)return a;var b=!Array.isArray(a.data),c=a.included?(0,_normalizeResources.default)(a.included):{};(0,_relationshipApplyToData.default)(c,c);var d=(0,_normalizeResources.default)(b?[a.data]:a.data);(0,_relationshipApplyToData.default)(d,c);var e=Object.values(d);return b?{data:e.shift()}:{data:e,paging:(0,_normalizePaging.default)(a)}}module.exports=exports.default;