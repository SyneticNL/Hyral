import {
  CreateElement, Component, VNode,
} from 'vue';
import { Collection } from '@hyral/core';
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
        const { name, type, parameterBag } = self.source;
        const repository = self.$store.getters[`hyral_${self.hyralService}/repository`](type);

        return new Collection(name, repository as any, parameterBag);
      },
    },
    created() {
      const self = this as IHyralView;

      if (!self.source.name || !self.source.type) {
        return;
      }

      self.initCollection();
    },
    async updated() {
      const self = this as IHyralView;
      const { name, type, parameterBag } = self.source;

      if (parameterBag) {
        await self.collection.load();
        self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection: self.collection });
      }
    },
    methods: {
      initCollection() {
        const self = this as IHyralView;

        const { name, type } = self.source;
        const collection = self.$store.getters[`hyral_${self.hyralService}/collection`](type)(name) as Collection<unknown>;
        if (collection) {
          return;
        }

        self.$store.commit(`hyral_${self.hyralService}/SET_COLLECTION`, { name, type, collection: self.collection });
      },
    },
    render(createElement: CreateElement): VNode {
      const self = this as unknown as IHyralView;

      const settings = {
        props: { source: self.source, hyralService },
        attrs: self.$attrs,
        class: [],
      };

      const elem = getEntity(self.source?.type, mapping as any, self.viewMode) as Component;
      return createElement(elem, settings);
    },
  };
}
