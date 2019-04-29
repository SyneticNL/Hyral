"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=serializeSorting;/**
 * @param {ParameterBag} parameterBag
 */function serializeSorting(a){if(0===a.sorting.length)return null;var b=a.sorting.map(function(a){var b="desc"===a.direction?"-":"";return"".concat(b).concat(a.field)});return{sort:b.join(",")}}module.exports=exports.default;