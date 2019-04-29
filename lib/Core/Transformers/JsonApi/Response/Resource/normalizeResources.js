"use strict";var _normalizeResource=_interopRequireDefault(require("./normalizeResource"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=normalizeResources;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @param {Array} items
 *
 * @returns {Object}
 */function normalizeResources(a){var b={};return a.forEach(function(a){b["".concat(a.type,"-").concat(a.id)]=(0,_normalizeResource["default"])(a)}),b}module.exports=exports.default;