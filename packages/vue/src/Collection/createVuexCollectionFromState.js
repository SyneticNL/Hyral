import Collection from '@hyral/core/lib/Resource/Collection';
import { mutateState } from '@hyral/core/src/State/State';

export default function createVuexCollectionFromState(name, state, repository, store) {
  const collection = Collection.fromState(name, state, repository);

  const { load } = collection;
  collection.load = () => load().then(() => {
    store.commit(`hyral_${repository.resourceType}/SET_COLLECTION`, {
      name: collection.name,
      state: collection.state,
    });

    collection.items.forEach((resource) => {
      store.commit(`hyral_${repository.resourceType}/SET_RESOURCE`, resource);
    });
    return collection;
  });

  const parameterBagDescriptor = Object.getOwnPropertyDescriptor(collection, 'parameterBag');
  Object.defineProperty(
    collection,
    'parameterBag',
    Object.assign(parameterBagDescriptor, {
      set(parameterBag) {
        parameterBagDescriptor.set(parameterBag);

        store.commit(`hyral_${repository.resourceType}/SET_COLLECTION`, {
          name: collection.name,
          state: Object.assign({}, collection.state, { parameterBag: parameterBag.state }),
        });
      },
    }),
  );

  return collection;
}
