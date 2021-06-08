import {
  CreateElement, Component, VNode,
} from 'vue';
import { IHyralEntity, IMapping } from '../__types__';
import ResourceMixin from '../Mixins/Resource';
import getEntity from '../Helpers/getEntity';

/**
 * Uses HyralResourceMixin to fetch the required drupal data automatically
 * @param hyralService String
 * @param mapping IMapping
 *
 * @requires source? Resource
 * @requires viewMode? String
 */
export default function Entity(hyralService: string, mapping: IMapping): Component {
  return {
    name: 'HyralEntity',
    mixins: [ResourceMixin(hyralService)],
    props: {
      viewMode: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        mapping,
      };
    },
    render(createElement: CreateElement): VNode {
      const self = this as unknown as IHyralEntity;

      const settings = {
        props: { resource: self.resource },
        attrs: self.$attrs,
        class: [],
      };

      const elem = getEntity(self.resource?.type, mapping as any, self.viewMode) as Component;
      return createElement(elem, settings);
    },
  };
}
