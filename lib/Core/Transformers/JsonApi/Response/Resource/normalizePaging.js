"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=normalizePaging;var _parse=_interopRequireDefault(require("qs/lib/parse")),_url=_interopRequireDefault(require("url"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @param {JsonApiResponse} response
 *
 * @returns {{count: number, pages: number}}
 */function normalizePaging(a){if(!a.links||!a.links.last)return{count:0,pages:0};var b=(0,_parse["default"])(_url["default"].parse(a.links.last).query),c=parseInt(b.page.number,10),d=parseInt(b.page.size,10);return{count:c*d,pages:c}}module.exports=exports.default;