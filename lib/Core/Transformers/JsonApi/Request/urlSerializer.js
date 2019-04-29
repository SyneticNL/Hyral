"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;/**
 * @type UrlSerializer
 */var urlSerializer={/**
   * @param {HyralRepository} repository
   *
   * @returns {string}
   */fetch:function fetch(a){return"/".concat(a.resourceType)},/**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */fetchOne:function fetchOne(a,b){return"/".concat(a.resourceType,"/").concat(b)},/**
   * @param {HyralRepository} repository
   *
   * @returns {string}
   */create:function create(a){return"/".concat(a.resourceType)},/**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */update:function update(a,b){return"/".concat(a.resourceType,"/").concat(b)},/**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */delete:function _delete(a,b){return"/".concat(a.resourceType,"/").concat(b)}},_default=urlSerializer;exports["default"]=_default,module.exports=exports.default;