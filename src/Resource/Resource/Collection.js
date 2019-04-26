import ParameterBag from '../ParameterBag';
import { currentState, setState } from '../../State/State';

/**
 * @param state
 * @returns {Promise}
 */
function collectionLoad(state) {
  if (this.isLoaded === true
    && currentState(state).metadata.lastParameterBagState === this.parameterBag.stateId) {
    return Promise.resolve();
  }

  currentState(state).metadata.loading = true;
  return this.repository.find(this.parameterBag).then((response) => {
    setState(state, {
      data: {
        items: response.data,
      },
      metadata: {
        paging: response.paging,
      },
    });
  }).finally(() => {
    setState(state, {
      metadata: {
        loading: false,
        loaded: true,
        lastParameterBagState: this.parameterBag.stateId,
      },
    });
  });
}

/**
 * @param {String} name
 * @param {HyralRepository} repository
 */
function Collection(name, repository) {
  const state = [{
    name,
    data: {
      items: [],
    },
    parameterBag: null,
    metadata: {
      loading: false,
      loaded: false,
      lastParameterBagState: null,
      paging: {
        count: null,
        pages: null,
      },
    },
  }];

  const collection = {
    get name() {
      return currentState(state).name;
    },

    get repository() {
      return repository;
    },

    get parameterBag() {
      return ParameterBag.fromState(state.parameterBag || {});
    },

    set parameterBag(parameterBag) {
      setState(state, { parameterBag: parameterBag.state });
    },

    /**
     * @returns {number}
     */
    get length() {
      return currentState(state).metadata.paging.count || 0;
    },

    /**
     * @returns {number}
     */
    get pages() {
      return currentState(state).metadata.paging.pages || 0;
    },

    /**
     * @returns {boolean}
     */
    get isLoading() {
      return currentState(state).metadata.loading;
    },

    /**
     * @returns {boolean}
     */
    get isLoaded() {
      return currentState(state).metadata.loaded;
    },

    /**
     * @returns {Array}
     */
    get items() {
      return currentState(state).data.items;
    },

    /**
     * @returns {[{}]}
     */
    get stateStack() {
      return state;
    },

    /**
     * @returns {object}
     */
    get state() {
      return currentState(state);
    },
  };

  collection.load = collectionLoad.bind(collection, state);

  return collection;
}

Collection.fromState = (state, repository) => {
  const newCollection = Collection(state.name, repository);

  setState(newCollection.stateStack, state);

  return newCollection;
};

export default Collection;
