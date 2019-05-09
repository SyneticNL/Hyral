import ParameterBag from './ParameterBag';
import {
  currentState,
  mutateState,
  resetState,
  setState,
} from '../State/State';

/**
 * @param collection
 *
 * @returns {Promise}
 */
function collectionLoad(collection) {
  return () => {
    if (collection.isLoaded === true
      && collection.state.metadata.lastParameterBagState === collection.parameterBag.stateId) {
      return Promise.resolve();
    }

    mutateState(collection.stateStack, {
      metadata: Object.assign({}, collection.state.metadata, { loading: true }),
    });

    return collection.repository.find(collection.parameterBag).then((response) => {
      mutateState(collection.stateStack, {
        data: {
          items: response.data,
        },
        metadata: Object.assign({}, collection.state.metadata, { paging: response.paging }),
      });
    }).finally(() => {
      mutateState(collection.stateStack, {
        metadata: Object.assign({}, collection.state.metadata, {
          loading: false,
          loaded: true,
          lastParameterBagState: collection.parameterBag.stateId,
        }),
      });
    });
  };
}

/**
 * @param {String} name
 * @param {HyralRepository} repository
 */
function Collection(name, repository) {
  const state = [{
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
      return name;
    },

    get repository() {
      return repository;
    },

    get parameterBag() {
      return ParameterBag.fromState(currentState(state).parameterBag || {});
    },

    set parameterBag(parameterBag) {
      mutateState(state, { parameterBag: parameterBag.state });
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

  collection.load = collectionLoad(collection);

  return collection;
}

Collection.fromState = (name, state, repository) => {
  const newCollection = Collection(name, repository);

  resetState(newCollection.stateStack);
  setState(newCollection.stateStack, state);

  return newCollection;
};

export default Collection;
