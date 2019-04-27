"use strict";var _State=require("../State/State");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;/**
 * @typedef HyralResource
 * @type {Object}
 * @property {string|number} id
 * @property {string} type
 * @property {object} data
 * @property {object} relationships
 * @property {object} metadata
 * @property {object} state
 * @property {boolean} metadata.loading
 * @property {boolean} metadata.loaded
 */ /**
 * @param {string|number|null} id
 * @param {string|null} type
 * @param {object|null} data
 * @param {object|null} relationships
 *
 * @returns {HyralResource}
 */function Resource(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null,c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null,d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null,e=[{id:a,type:b,data:c||{},relationships:d||{}}],f={loaded:null!==c,loading:!1};return{/**
     * @returns {string|number}
     */get id(){return(0,_State.currentState)(e).id},/**
     * @returns {string}
     */get type(){return(0,_State.currentState)(e).type},/**
     * @returns {object}
     */get data(){return(0,_State.currentState)(e).data},/**
     * @param {object} newData
     */set data(a){(0,_State.setState)(e,{data:a})},/**
     * @returns {object}
     */get relationships(){return(0,_State.currentState)(e).relationships},/**
     * @param {object} newRelationships
     */set relationships(a){(0,_State.setState)(e,{relationships:a})},/**
     * @returns {object}
     */get metadata(){return f},/**
     * @returns {[{}]}
     */get stateStack(){return e},/**
     * @returns {Object}
     */get state(){return(0,_State.currentState)(e)}}}/**
 * @param {object} state
 *
 * @returns {HyralResource}
 */Resource.fromState=function(a){var b=Resource();return(0,_State.setState)(b.stateStack,a),b};var _default=Resource;exports.default=_default,module.exports=exports.default;