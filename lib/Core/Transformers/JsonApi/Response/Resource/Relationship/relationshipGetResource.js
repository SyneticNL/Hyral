"use strict";var _Resource=_interopRequireDefault(require("../../../../../Resource/Resource"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=relationshipGetResource;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @param {{id: String, type: String}} item
 * @param {Object<Resource[]>} includedRelations
 *
 * @returns {Resource}
 */function relationshipGetResource(a,b){return b["".concat(a.type,"-").concat(a.id)]||(0,_Resource["default"])(a.id,a.type)}module.exports=exports.default;