import { IHyralView } from '../__types__';

/**
 * Generic mixin to insert the collection into the component
 */
export default {
  props: {
    source: {
      type: Object,
      required: false,
    },
    hyralService: {
      type: String,
      required: false,
    },
  },
  computed: {
    collection(): unknown {
      const self = this as unknown as IHyralView;
      const { name, type } = self.source;
      const service = `hyral_${self.hyralService}/collection`;

      return self.$store.getters[service](type)(name) as unknown;
    },
  },
};
