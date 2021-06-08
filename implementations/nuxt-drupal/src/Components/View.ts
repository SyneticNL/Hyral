import {
  CreateElement, Component, VNode,
} from 'vue';
import { Collection, ParameterBag } from '@hyral/core';
import { IHyralView, IMapping } from '../__types__';
import getEntity from '../Helpers/getEntity';

/**
 * The HyralView has method load to be used as ref
 * @param hyralService String
 * @param mapping IMapping
 *
 * @method load
 *
 * @requires source { name, type, parameterBag }
 * @requires viewMode? String
 */
export default function View(hyralService = 'drupal', mapping: IMapping): Component {
  return {
    name: 'HyralView',
    props: {
      source: {
        type: Object,
        required: true,
      },
      viewMode: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        mapping,
        hyralService,
      };
    },
    computed: {
      collection(): any {
        const self = this as unknown as IHyralView;
        const service = `hyral_${self.hyralService}/collection`;
        const { type, name } = self.source;

        return self.$store.getters[service](type)(name) as Collection<unknown>;
      },
    },
    created() {
      const self = this as IHyralView;

      if (!self.source.name || !self.source.type) {
        return;
      }

      const { name, type } = self.source;
      let collection = self.$store.getters[`hyral_${self.hyralService}/collection`](type)(name) as Collection<unknown>;
      if (collection) {
        return;
      }
      const repository = self.$store.getters[`hyral_${self.hyralService}/repository`](type);
      collection = new Collection(name, repository as any);

      self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection });
    },
    methods: {
      async loadCollection(parameterBag: ParameterBag): Promise<void> {
        const self = this as IHyralView;

        self.collection.parameterBag = parameterBag;
        await self.collection.load();
        const { name, type } = self.source;
        self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection: self.collection });
      },
    },
    render(createElement: CreateElement): VNode {
      const self = this as unknown as IHyralView;

      const settings = {
        props: { collection: self.collection },
        attrs: self.$attrs,
        class: [],
      };

      const elem = getEntity(self.source?.type, mapping as any, self.viewMode) as Component;
      return createElement(elem, settings);
    },
  };
}
