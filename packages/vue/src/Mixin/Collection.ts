import { Collection } from '@hyral/core';
import { ICollectionGetter, ICollectionMixin } from '../__types__';

export default {
  computed: {
    collection(this: ICollectionMixin): Collection<unknown> | null {
      if (!this.source?.name || !this.source?.type || !this.hyralService) {
        return null;
      }

      const getter = `hyral_${this.hyralService}/collection`;
      const { type, name } = this.source;

      const collection = (this.$store.getters[getter] as ICollectionGetter)(type)(name);
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
      if (!this.source?.name || !this.source?.type || !this.hyralService) {
        return;
      }

      const getter = `hyral_${this.hyralService}/collection`;
      const { type, name } = this.source;

      if ((this.$store.getters[getter] as ICollectionGetter)(type)(name)) {
        return;
      }

      this.$store.commit(`hyral_${this.hyralService}/SET_COLLECTION`, new Collection(name, type));
    },
    async loadCollection(this: ICollectionMixin): Promise<void> {
      if (!this.source?.parameterBag || !this.hyralService) {
        return;
      }

      await this.$store.dispatch(`hyral_${this.hyralService}/LOAD_COLLECTION`, this.collection);
    },
  },
};
