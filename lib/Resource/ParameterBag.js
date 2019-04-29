"use strict";var _State=require("../State/State");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function ParameterBag(){var a=[{parameters:{filters:[],sorting:[],paging:{},params:{}},metadata:{stateId:0}}];return{/**
     * @returns {HyralFilter[]}
     */get filters(){return(0,_State.currentState)(a).parameters.filters},/**
     * @param {HyralFilter} filter
     */addFilter:function addFilter(b){var c=(0,_State.currentState)(a).parameters.filters;c.push(b),(0,_State.setState)(a,{parameters:{filters:c}})},/**
     * @param {HyralFilter[]} filters
     */setFilters:function setFilters(b){(0,_State.setState)(a,{parameters:{filters:b}})},/**
     * @returns {HyralPaging}
     */get paging(){return(0,_State.currentState)(a).parameters.paging},/**
     * @param {HyralPaging} paging
     */setPaging:function setPaging(b){(0,_State.setState)(a,{parameters:{paging:b}})},/**
     * @returns {HyralSorting[]}
     */get sorting(){return(0,_State.currentState)(a).parameters.sorting},/**
     * @param {HyralSorting[]} sorting
     */setSorting:function setSorting(b){(0,_State.setState)(a,{parameters:{sorting:b}})},/**
     * @returns {Object}
     */get params(){return(0,_State.currentState)(a).parameters.params},/**
     * @param {string} key
     * @param value
     */addParam:function addParam(b,c){(0,_State.setState)(a,{parameters:{params:_defineProperty({},b,c)}})},/**
     * @param {Object} params
     */setParams:function setParams(b){(0,_State.setState)(a,{parameters:{params:b}})},get stateId(){return a.length-1},/**
     * @returns {[{}]}
     */get stateStack(){return a},/**
     * @returns {object}
     */get state(){return(0,_State.currentState)(a)}}}ParameterBag.fromState=function(a){var b=ParameterBag();return(0,_State.setState)(b.stateStack,a),b};var _default=ParameterBag;exports.default=_default,module.exports=exports.default;