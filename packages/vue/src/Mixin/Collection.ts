import { Collection } from '@hyral/core';
import { ICollectionMixin } from '../__types__';

export default {
  computed: {
    collection(this: ICollectionMixin): Collection<unknown> | null {
      if (!this.source?.name || !this.source?.type) {
        return null;
      }

      const service = `hyral_${this.hyralService}/collection`;
      const { type, name } = this.source;

      const collection = this.$store.getters[service](type)(name);
      if (!collection) {
        return null;
      }

      if (!this.source.parameterBag) {
        return collection;
      }

      collection.parameterBag = this.source.parameterBag;

      return collection;
    },
  },
  created(this: ICollectionMixin): void {
    this.initCollection();
  },
  /**
   * Execute server prefetch actions.
   */
  async serverPrefetch(this: ICollectionMixin): Promise<void> {
    await this.loadCollection();
  },
  async mounted(this: ICollectionMixin): Promise<void> {
    await this.loadCollection();
  },
  methods: {
    initCollection(this: ICollectionMixin): void {
      if (!this.source?.name || !this.source?.type) {
        return;
      }

      const { name, type } = this.source;
      let collection = this.$store.getters[`hyral_${this.hyralService}/collection`](type)(name);
      if (collection) {
        return;
      }
      const repository = this.$store.getters[`hyral_${this.hyralService}/repository`](type);
      collection = new Collection(name, repository as any);

      this.$store.commit(`hyral_${this.hyralService}/SET_COLLECTION`, { name, type, collection });
    },
    async loadCollection(this: ICollectionMixin): Promise<void> {
      if (!this.collection || !this.source?.parameterBag) {
        return;
      }

      await this.collection.load();
      const { name, type } = this.source;
      this.$store.commit(`hyral_${this.hyralService}/SET_COLLECTION`, { name, type, collection: this.collection });
    },
  },
};
