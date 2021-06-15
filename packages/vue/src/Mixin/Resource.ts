import isEmpty from 'lodash/isEmpty';
import { Resource } from '@hyral/core';
import { IResourceGetter, IResourceMixin } from '../__types__';

export default {
  computed: {
    resource(this: IResourceMixin): Resource<unknown> | null {
      if (!this.source?.id || !this.source.type || !this.hyralService) {
        return null;
      }

      if (!isEmpty(this.source.data)) {
        return this.source;
      }

      const { id, type } = this.source;
      const getter = `hyral_${this.hyralService}/resource`;

      return (this.$store.getters[getter] as IResourceGetter)(type)(id.toString());
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
      if (!this.source?.id || !this.source.type || !this.hyralService) {
        return;
      }

      if (!isEmpty(this.source.data)) {
        return;
      }

      await this.$store.dispatch(`hyral_${this.hyralService}/LOAD_RESOURCE`, this.source);
    },
  },
};
