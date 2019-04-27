"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=serializePaging;/**
 * @param {ParameterBag} parameterBag
 *
 * @return {{page: {offset: Number, limit: Number}}}
 */function serializePaging(a){return{page:a.paging}}module.exports=exports.default;