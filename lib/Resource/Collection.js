"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _ParameterBag=_interopRequireDefault(require("./ParameterBag")),_State=require("../State/State");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * @param state
 * @returns {Promise}
 */function collectionLoad(a){var b=this;return!0===this.isLoaded&&(0,_State.currentState)(a).metadata.lastParameterBagState===this.parameterBag.stateId?Promise.resolve():((0,_State.currentState)(a).metadata.loading=!0,this.repository.find(this.parameterBag).then(function(b){(0,_State.setState)(a,{data:{items:b.data},metadata:{paging:b.paging}})}).finally(function(){(0,_State.setState)(a,{metadata:{loading:!1,loaded:!0,lastParameterBagState:b.parameterBag.stateId}})}))}/**
 * @param {String} name
 * @param {HyralRepository} repository
 */function Collection(a,b){var c=[{name:a,data:{items:[]},parameterBag:null,metadata:{loading:!1,loaded:!1,lastParameterBagState:null,paging:{count:null,pages:null}}}],d={get name(){return(0,_State.currentState)(c).name},get repository(){return b},get parameterBag(){return _ParameterBag.default.fromState(c.parameterBag||{})},set parameterBag(a){(0,_State.setState)(c,{parameterBag:a.state})},/**
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
     */get state(){return(0,_State.currentState)(c)}};return d.load=collectionLoad.bind(d,c),d}Collection.fromState=function(a,b){var c=Collection(a.name,b);return(0,_State.setState)(c.stateStack,a),c};var _default=Collection;exports.default=_default,module.exports=exports.default;