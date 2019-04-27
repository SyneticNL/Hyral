"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.currentState=currentState,exports.setState=setState;var _merge=_interopRequireDefault(require("lodash/merge")),_cloneDeep=_interopRequireDefault(require("lodash/cloneDeep"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @returns {object}
 */function currentState(a){return a[a.length-1]}/**
 * @param {[{}]} state
 * @param {Object} newState
 */function setState(a,b){a.push((0,_merge.default)((0,_cloneDeep.default)(currentState(a)),b))}