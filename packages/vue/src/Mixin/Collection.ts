import { Collection } from '@hyral/core';
import { ICollectionMixin } from '../__types__';

export default {
  computed: {
    collection(): Collection<unknown> | null {
      const self = this as unknown as ICollectionMixin;
      const service = `hyral_${self.hyralService}/collection`;
      const { type, name } = self.source;

      const collection = self.$store.getters[service](type)(name);
      if (!collection) {
        return null;
      }

      if (!self.source.parameterBag) {
        return collection;
      }

      collection.parameterBag = self.source.parameterBag;

      return collection;
    },
  },
  created(): void {
    const self = this as unknown as ICollectionMixin;

    if (!self.source.name || !self.source.type) {
      return;
    }

    self.initCollection();
  },
  /**
   * Execute server prefetch actions.
   */
  async serverPrefetch(): Promise<void> {
    const self = this as unknown as ICollectionMixin;

    await self.loadCollection();
  },
  async mounted(): Promise<void> {
    const self = this as unknown as ICollectionMixin;

    await self.loadCollection();
  },
  methods: {
    initCollection(): void {
      const self = this as ICollectionMixin;

      const { name, type } = self.source;
      let collection = self.$store.getters[`hyral_${self.hyralService}/collection`](type)(name);
      if (collection) {
        return;
      }
      const repository = self.$store.getters[`hyral_${self.hyralService}/repository`](type);
      collection = new Collection(name, repository as any);

      self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection });
    },
    async loadCollection(): Promise<void> {
      const self = this as ICollectionMixin;

      await self.collection.load();
      const { name, type } = self.source;
      self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection: self.collection });
    },
  },
};
