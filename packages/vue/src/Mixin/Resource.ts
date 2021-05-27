import isEmpty from 'lodash/isEmpty';
import { Resource } from '@hyral/core';
import { IResourceMixin } from '../__types__';

export default {
  computed: {
    resource(): Resource<unknown> | any {
      const self = this as unknown as IResourceMixin;

      if (!self.resourceAsProp?.id || !self.resourceAsProp?.type) {
        return null;
      }

      if (!isEmpty(self.resourceAsProp.data)) {
        return self.resourceAsProp;
      }

      const { id, type } = self.resourceAsProp;

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

      if (!isEmpty(self.resourceAsProp?.data)) {
        return Promise.resolve();
      }

      if (!self.resourceAsProp?.id || !self.resourceAsProp?.type || !self.hyralService) {
        return Promise.reject();
      }

      const { id, type } = self.resourceAsProp;
      return self.$store.dispatch(
        `hyral_${self.hyralService}/LOAD_RESOURCE`,
        { id, resourceType: type, parameterBag: self.parameterBag },
      );
    },
  },
};
