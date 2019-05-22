import Collection from '@hyral/core/lib/Resource/Collection';

function addLoadProxy(collection, state, repository, store) {
  const { load } = collection;

  Object.defineProperty(collection, 'load', {
    value: () => load().then(() => {
      store.commit(`hyral_${repository.resourceType}/SET_COLLECTION`, {
        name: collection.name,
        state: collection.state,
      });

      collection.items.forEach((resource) => {
        store.commit(`hyral_${repository.resourceType}/SET_RESOURCE`, resource);
      });
      return collection;
    }),
  });
}

function addParameterBagProxy(collection, state, repository, store) {
  const parameterBagDescriptor = Object.getOwnPropertyDescriptor(collection, 'parameterBag');
  Object.defineProperty(
    collection,
    'parameterBag',
    Object.assign({}, parameterBagDescriptor, {
      set(parameterBag) {
        parameterBagDescriptor.set(parameterBag);

        store.commit(`hyral_${repository.resourceType}/SET_COLLECTION`, {
          name: collection.name,
          state: Object.assign({}, collection.state, { parameterBag: parameterBag.state }),
        });
      },
    }),
  );
}

export default function createVuexCollectionFromState(name, state, repository, store) {
  const collection = Collection.fromState(name, state, repository);

  addLoadProxy(collection, state, repository, store);
  addParameterBagProxy(collection, state, repository, store);

  return collection;
}
