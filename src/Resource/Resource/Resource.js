/* eslint-disable no-underscore-dangle */
import cloneDeep from 'lodash/fp/cloneDeep';

function Resource(id, type, data = null, relationships = null) {
  if (!new.target) {
    throw Error('Resource() must be called with new');
  }

  Object.defineProperties(this, {
    _activeState: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: 0,
    },
    _state: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: [{
        id,
        type,
        data: data || {},
        relationships: relationships || {},
        persisted: data !== null && id !== null,
      }],
    },
    _metadata: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: {
        loaded: data !== null,
        loading: false,
      },
    },
  });
}

Resource.prototype = {
  /**
   * @returns {string|number}
   */
  get id() {
    return this.state.id;
  },

  /**
   * @returns {string}
   */
  get type() {
    return this.state.type;
  },

  /**
   * @returns {object}
   */
  get data() {
    return this.state.data;
  },

  /**
   * @param {object} data
   */
  set data(data) {
    const newState = cloneDeep(this.state);
    newState.data = data;

    this.state = newState;
  },

  /**
   * @returns {object}
   */
  get relationships() {
    return this.state.relationships;
  },

  /**
   * @param {object} relationships
   */
  set relationships(relationships) {
    const newState = cloneDeep(this.state);
    newState.relationships = relationships;

    this.state = newState;
  },

  /**
   * @returns {object}
   */
  get metadata() {
    return this._metadata;
  },

  /**
   * @returns {object}
   */
  get state() {
    return this._state[this._activeState];
  },

  /**
   * @param state {object}
   */
  set state(state) {
    const newState = cloneDeep(state);
    newState.persisted = false;

    this._state.push(newState);

    this._activeState = this._state.length - 1;
  },

  /**
   * @param {boolean} persisted
   */
  set persisted(persisted) {
    this.state.persisted = persisted;
  },
};

export default Resource;
