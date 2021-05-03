import { Collection } from '@hyral/core';
import { ICollectionMixin } from '../__types__';

export default {
  computed: {
    collection(): Collection<unknown> | null {
      const self = this as unknown as ICollectionMixin;
      const collection = self.$store.getters[`hyral_${self.hyralService}/collection`](self.resourceType)(self.collectionName);

      if (!collection) {
        return null;
      }

      if (!self.parameterBag) {
        return collection;
      }

      collection.parameterBag = self.parameterBag;

      return collection;
    },
  },

  /**
   * Execute server prefetch actions.
   */
  serverPrefetch(): Promise<void> {
    const self = this as unknown as ICollectionMixin;
    if (!self.collectionName || !self.resourceType || !self.hyralService) {
      return Promise.reject();
    }
    return self.loadCollection();
  },
  async mounted(): Promise<void> {
    const self = this as unknown as ICollectionMixin;
    if (!self.collectionName || !self.resourceType || !self.hyralService) {
      return;
    }

    await self.loadCollection();
  },
  methods: {
    loadCollection(): Promise<void> | undefined {
      const self = this as ICollectionMixin;
      return self.$store.dispatch(
        `hyral_${self.hyralService}/LOAD_COLLECTION`,
        { name: self.collectionName, resourceType: self.resourceType },
      );
    },
  },
};
