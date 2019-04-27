"use strict";var _Repository=_interopRequireDefault(require("./Repository"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var repositories={},RepositoryManager={};Object.assign(RepositoryManager,{/**
   * @param {HyralConnector} connector
   * @param {String} resourceType
   * @param {String} identifier='id'
   *
   * @returns HyralRepository
   */createRepository:function createRepository(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"id",d=(0,_Repository["default"])(a,b,c);return this.addRepository(d),d},/**
   * @param {HyralRepository} resourceRepository
   */addRepository:function addRepository(a){if("undefined"!=typeof repositories[a.resourceType])throw Error("Trying to add a repository for ".concat(a.resourceType," while there already exists a repository for that type."));repositories[a.resourceType]=a},/**
   * @param resourceType
   *
   * @returns HyralRepository|null
   */getRepository:function getRepository(a){return repositories[a]||null},/**
   * @returns {{resourceType: HyralRepository}}
   */getRepositories:function getRepositories(){return repositories}});var _default=RepositoryManager;exports["default"]=_default,module.exports=exports.default;