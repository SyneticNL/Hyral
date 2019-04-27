"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=serializeFilters;/**
 * @param {ParameterBag} parameterBag
 */function serializeFilters(a){var b={};return a.filters.forEach(function(a){b[a.field]=a.value}),{filter:b}}module.exports=exports.default;