
/**
 * @typedef HyralResourceRelationship
 * @type {Object}
 * @property {string} resource
 * @property {string} cardinality
 * @property {boolean} many
 */

/**
 * @typedef HyralResource
 * @type {Object}
 * @property {string|number} id
 * @property {string} type
 * @property {object} data
 * @property {Object.<string, HyralResourceRelationship>|null} relationships
 * @property {object} metadata
 * @property {object} meta
 * @property {object} state
 * @property {array} stateStack
 * @property {boolean} metadata.loading
 * @property {boolean} metadata.loaded
 */

import {
  currentState,
  mutateState,
} from '../State/State';

/**
 * @param {string|number|null} id
 * @param {string} type
 * @param {object|null} data
 * @param {Object.<string, HyralResourceRelationship>|null} relationships
 * @param {Object|null} meta
 *
 * @returns {HyralResource}
 */
function Resource(id = null, type, data = null, relationships = null, meta = null) {
  const state = [{
    id,
    data: data || {},
    relationships: relationships || {},
    meta: meta || {},
  }];

  let metadata = {
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
      return type;
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
      mutateState(state, { data: newData });
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
      mutateState(state, { relationships: newRelationships });
    },

    /**
     * @param {{loaded: boolean, loading: boolean}} value
     */
    setMetadata(value) {
      metadata = value;
    },

    /**
     * get Hyral metadata.
     *
     * @returns {{loaded: boolean, loading: boolean}}
     */
    get metadata() {
      return metadata;
    },

    /**
     * get Resource meta information.
     *
     * @returns {object|null}
     */
    get meta() {
      return currentState(state).meta;
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

Resource.decorators = [];

/**
 * @param {string|number|null} id
 * @param {string} type
 * @param {object|null} data
 * @param {Object.<string, HyralResourceRelationship>|null} relationships
 * @param {object|null} meta
 *
 * @returns {HyralResource}
 */
Resource.create = (id = null, type, data = null, relationships = null, meta = null) => (
  Resource.decorators.reduce((resource, decorator) => decorator(resource),
    Resource(
      id,
      type,
      data,
      relationships,
      meta,
    ))
);

/**
 *
 * @param {string|number|null} id
 * @param {string} type
 * @param {object} state
 *
 * @returns {HyralResource}
 */
Resource.fromState = (id, type, state) => Resource.create(
  id,
  type,
  state.data || null,
  state.relationships || null,
  state.meta || null,
);

export default Resource;
