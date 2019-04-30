"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _ParameterBag=_interopRequireDefault(require("./ParameterBag")),_State=require("../State/State");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @param collection
 *
 * @returns {Promise}
 */function collectionLoad(a){return function(){return!0===a.isLoaded&&a.state.metadata.lastParameterBagState===a.parameterBag.stateId?Promise.resolve():((0,_State.setState)(a.stateStack,{metadata:{loading:!0}}),a.repository.find(a.parameterBag).then(function(b){(0,_State.setState)(a.stateStack,{data:{items:b.data},metadata:{paging:b.paging}})})["finally"](function(){(0,_State.setState)(a.stateStack,{metadata:{loading:!1,loaded:!0,lastParameterBagState:a.parameterBag.stateId}})}))}}/**
 * @param {String} name
 * @param {HyralRepository} repository
 */function Collection(a,b){var c=[{data:{items:[]},parameterBag:null,metadata:{loading:!1,loaded:!1,lastParameterBagState:null,paging:{count:null,pages:null}}}],d={get name(){return a},get repository(){return b},get parameterBag(){return _ParameterBag["default"].fromState((0,_State.currentState)(c).parameterBag||{})},set parameterBag(a){(0,_State.setState)(c,{parameterBag:a.state})},/**
     * @returns {number}
     */get length(){return(0,_State.currentState)(c).metadata.paging.count||0},/**
     * @returns {number}
     */get pages(){return(0,_State.currentState)(c).metadata.paging.pages||0},/**
     * @returns {boolean}
     */get isLoading(){return(0,_State.currentState)(c).metadata.loading},/**
     * @returns {boolean}
     */get isLoaded(){return(0,_State.currentState)(c).metadata.loaded},/**
     * @returns {Array}
     */get items(){return(0,_State.currentState)(c).data.items},/**
     * @returns {[{}]}
     */get stateStack(){return c},/**
     * @returns {object}
     */get state(){return(0,_State.currentState)(c)}};return d.load=collectionLoad(d),d}Collection.fromState=function(a,b,c){var d=Collection(a,c);return(0,_State.setState)(d.stateStack,b),d};var _default=Collection;exports["default"]=_default,module.exports=exports.default;