import isEmpty from 'lodash/isEmpty';
import { Resource } from '@hyral/core';
import { IResourceMixin } from '../__types__';

export default {
  computed: {
    resource(): Resource<unknown> | null {
      const self = this as unknown as IResourceMixin;

      if (!self.source?.id || !self.source?.type) {
        return null;
      }

      if (!isEmpty(self.source.data)) {
        return self.source;
      }

      const { id, type } = self.source;

      return self.$store.getters[`hyral_${self.hyralService}/resource`](type)(id.toString());
    },
  },
  /**
   * Executes prefetch actions. This also caches the data by not retrieving it again
   */
  serverPrefetch(): Promise<void> {
    const self = this as unknown as IResourceMixin;

    return self.loadResource();
  },
  mounted(): Promise<void> {
    const self = this as unknown as IResourceMixin;

    return self.loadResource();
  },
  methods: {
    loadResource(): Promise<any> {
      const self = this as IResourceMixin;

      if (!isEmpty(self.source?.data)) {
        return Promise.resolve();
      }

      if (!self.source?.id || !self.source?.type || !self.hyralService) {
        return Promise.reject();
      }

      const { id, type } = self.source;
      return self.$store.dispatch(
        `hyral_${self.hyralService}/LOAD_RESOURCE`,
        { id, resourceType: type, parameterBag: self.parameterBag },
      );
    },
  },
};
