
/**
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
 */

import { currentState, setState } from '../../State/State';

/**
 * @param {string|number|null} id
 * @param {string|null} type
 * @param {object|null} data
 * @param {object|null} relationships
 *
 * @returns {HyralResource}
 */
function Resource(id = null, type = null, data = null, relationships = null) {
  const state = [{
    id,
    type,
    data: data || {},
    relationships: relationships || {},
  }];

  const metadata = {
    loaded: data !== null,
    loading: false,
  };

  return {
    /**
     * @returns {string|number}
     */
    get id() {
      return currentState(state).id;
    },

    /**
     * @returns {string}
     */
    get type() {
      return currentState(state).type;
    },

    /**
     * @returns {object}
     */
    get data() {
      return currentState(state).data;
    },

    /**
     * @param {object} newData
     */
    set data(newData) {
      setState(state, { data: newData });
    },

    /**
     * @returns {object}
     */
    get relationships() {
      return currentState(state).relationships;
    },

    /**
     * @param {object} newRelationships
     */
    set relationships(newRelationships) {
      setState(state, { relationships: newRelationships });
    },

    /**
     * @returns {object}
     */
    get metadata() {
      return metadata;
    },

    /**
     * @returns {[{}]}
     */
    get stateStack() {
      return state;
    },

    /**
     * @returns {Object}
     */
    get state() {
      return currentState(state);
    },
  };
}

Resource.fromState = (state) => {
  const resource = Resource();

  setState(resource.stateStack, state);

  return resource;
};


export default Resource;
