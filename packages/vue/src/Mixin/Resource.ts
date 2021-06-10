import isEmpty from 'lodash/isEmpty';
import { Resource } from '@hyral/core';
import { IResourceMixin } from '../__types__';

export default {
  computed: {
    resource(this: IResourceMixin): Resource<unknown> | null {
      if (!this.source?.id || !this.source?.type) {
        return null;
      }

      if (!isEmpty(this.source.data)) {
        return this.source;
      }

      const { id, type } = this.source;

      return this.$store.getters[`hyral_${this.hyralService}/resource`](type)(id.toString());
    },
  },
  /**
   * Executes prefetch actions. This also caches the data by not retrieving it again
   */
  async serverPrefetch(this: IResourceMixin): Promise<void> {
    await this.loadResource();
  },
  async mounted(this: IResourceMixin): Promise<void> {
    await this.loadResource();
  },
  methods: {
    async loadResource(this: IResourceMixin): Promise<any> {
      if (!this.source?.id || !this.source?.type || !this.hyralService) {
        return;
      }

      if (!isEmpty(this.source?.data)) {
        return;
      }

      const { id, type } = this.source;
      await this.$store.dispatch(`hyral_${this.hyralService}/LOAD_RESOURCE`, { id, type, parameterBag: this.parameterBag });
    },
  },
};
