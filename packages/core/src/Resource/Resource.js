
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
import mapValues from 'lodash/mapValues';
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
function Resource(id, type, data = null, relationships = null, meta = null) {
  const state = [{
    id: id || null,
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
     * @param {object|null} value
     */
    set meta(value) {
      mutateState(state, { meta: value });
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
      const normalState = currentState(state);

      const relationData = mapValues(normalState.relationships, (relation, relationKey) => {
        if (!normalState.data[relationKey]) {
          return null;
        }

        if (Array.isArray(normalState.data[relationKey])) {
          return normalState.data[relationKey].map(value => ({ state: value.state, type: value.type }));
        }

        return { state: normalState.data[relationKey].state, type: normalState.data[relationKey].type };
      });

      return Object.assign({}, normalState, {
        data: Object.assign({}, normalState.data, relationData),
      });
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
Resource.fromState = (id, type, state) => {
  if (!state || !state.relationships) {
    return Resource.create(
      id,
      type,
      state ? state.data : null,
      null,
      state ? state.meta : null,
    );
  }

  const relationData = mapValues(state.relationships, (relation, relationKey) => {
    if (!state.data[relationKey]) {
      return null;
    }

    if (Array.isArray(state.data[relationKey])) {
      return state.data[relationKey].map(value => Resource.fromState(
        value.state ? value.state.id : null,
        value.type,
        value.state || null,
      ));
    }

    return Resource.fromState(
      state.data[relationKey].state ? state.data[relationKey].state.id : null,
      state.data[relationKey].type,
      state.data[relationKey].state || null,
    );
  });

  const resourceData = Object.assign({}, state.data, relationData);

  return Resource.create(
    id,
    type,
    Object.getOwnPropertyNames(resourceData).length ? resourceData : null,
    state.relationships || null,
    state.meta || null,
  );
};

export default Resource;
