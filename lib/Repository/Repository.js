"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Repository;/**
 * @typedef HyralRepository
 * @type {Object}
 * @property {HyralConnector} connector
 * @property {string} resourceType
 * @property {string} identifier
 * @property {function} find
 * @property {function} findOne
 * @property {function} findById
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */function Repository(a,b,c){var d={/**
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise<Resource[]>}
     */find:function find(b){return a.fetch(this,b).then(function(a){return a.data})},/**
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise<Resource>}
     */findOne:function findOne(b){return a.fetch(this,b).then(function(a){return a.data.data[0]||null})},/**
     * @param {String|Number} id
     *
     * @returns {Promise<Resource>}
     */findById:function findById(b){return a.fetchOne(this,b,{})},/**
     * @param {Object} entity
     *
     * @returns {Promise<Resource>}
     */create:function create(b){return a.create(this,b)},/**
     * @param {Object} entity
     *
     * @returns {Promise<Resource>}
     */update:function update(b){return a.create(this,b)},/**
     * @param {Object} entity
     *
     * @returns {Promise<Object>}
     */delete:function _delete(b){return a.create(this,b)}};return Object.defineProperties(d,{resourceType:{writable:!1,enumerable:!1,value:b},identifier:{writable:!1,enumerable:!1,value:c}}),d}module.exports=exports.default;