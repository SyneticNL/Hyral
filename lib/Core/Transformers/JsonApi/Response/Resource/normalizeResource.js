"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=normalizeResource;var _Resource=_interopRequireDefault(require("../../../../Resource/Resource")),_relationshipGetType=_interopRequireDefault(require("./Relationship/relationshipGetType"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}/**
 * @param {JsonApiResource} data
 *
 * @returns {Resource}
 */function normalizeResource(a){var b=(0,_Resource["default"])(a.id,a.type,a.attributes);return a.relationships?(Object.entries(a.relationships).forEach(function(a){var c=_slicedToArray(a,2),d=c[0],e=c[1];b.relationships[d]={isMany:Array.isArray(e.data),type:(0,_relationshipGetType["default"])(e)},b.data[d]=e.data}),b):b}module.exports=exports.default;