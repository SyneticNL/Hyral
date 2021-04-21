import { Resource } from '@hyral/core';
import { IResourceMixin } from '../__types__';

export default {
  computed: {
    resource(): Resource<unknown> {
      const self = this as unknown as IResourceMixin;
      return self.$store.getters[`hyral_${self.hyralService}/resource`](self.resourceType)(self.id);
    },
  },
  /**
   * Executes prefetch actions. This also caches the data by not retrieving it again
   */
  serverPrefetch(): Promise<void> {
    const self = this as unknown as IResourceMixin;
    if (!self.id || !self.resourceType || !self.hyralService) {
      return Promise.reject();
    }

    const resource = self.$store.getters[`hyral_${self.hyralService}/resource`](self.resourceType)(self.id);
    if (resource) {
      return Promise.resolve();
    }

    return self.loadResource();
  },
  async mounted(): Promise<void> {
    const self = this as unknown as IResourceMixin;
    if (!self.id || !self.resourceType || !self.hyralService) {
      return;
    }

    if (!self.resource) {
      await self.loadResource();
    }
  },
  methods: {
    loadResource(): Promise<any> {
      const self = this as IResourceMixin;
      return self.$store.dispatch(
        `hyral_${self.hyralService}/LOAD_RESOURCE`,
        { id: self.id, resourceType: self.resourceType, parameterBag: self.parameterBag },
      );
    },
  },
};
