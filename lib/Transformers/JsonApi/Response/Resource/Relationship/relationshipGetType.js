"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=relationshipGetType;/**
 * @param {{id: String, type: String, data: Object}} relation
 *
 * @returns {String|null}
 */function relationshipGetType(a){return!a.data||Array.isArray(a.data)&&0===a.data.length?null:Array.isArray(a.data)?a.data[0].type:a.data.type}module.exports=exports.default;