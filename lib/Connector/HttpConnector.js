"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;/**
 * @typedef HyralConnector
 * @type {Object}
 * @property {AxiosInstance} axios - AxiosInstance
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */ /**
 * @typedef UrlSerializer
 * @type {object}
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */ /**
 * @param {AxiosInstance} axios
 * @param {UrlSerializer} urlSerializer
 * @param {function} paramsSerializer
 * @param {function} requestSerializer
 * @param {function} responseNormalizer
 *
 * @returns {HyralConnector}
 */function HttpConnector(a,b,c,d,e){/* eslint-enable no-param-reassign */return a.defaults.paramsSerializer=c,a.defaults.transformRequest.push(d),a.defaults.transformResponse.push(e),{/**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */fetch:function fetch(c,d){return a.get(b.fetch(c),{params:d})},/**
     * @param {HyralRepository} repository
     * @param {number|string} id
     * @param {ParameterBag} parameterBag
     */fetchOne:function fetchOne(c,d,e){return a.get(b.fetchOne(c,d),{params:e})},/**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */create:function create(b,c){a.post({repository:b,data:c})},/**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */update:function update(b,c){a.patch({repository:b,data:c})},/**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */delete:function _delete(b,c){a.delete({repository:b,params:c})}}}var _default=HttpConnector;exports.default=_default,module.exports=exports.default;