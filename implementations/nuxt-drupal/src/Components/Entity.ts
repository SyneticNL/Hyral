import {
  CreateElement, Component, VNode,
} from 'vue';
import { IHyralEntity, IMapping } from '../__types__';
import ContentMixin from '../Mixins/Content';
import getEntity from '../Helpers/getEntity';

/**
 * Uses HyralResourceMixin to fetch the required drupal data automatically
 * @param hyralService String
 * @param mapping IMapping
 *
 * @requires source? Resource || { name, type, parameterBag }
 * @requires viewMode? String
 */
export default function Entity(hyralService: string, mapping: IMapping): Component {
  return {
    name: 'Entity',
    mixins: [ContentMixin(hyralService)],
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
    render(this: IHyralEntity, createElement: CreateElement): VNode {
      const settings = {
        props: { resource: this.resource, collection: this.collection },
        attrs: this.$attrs,
        class: [],
      };

      const type = this.resource?.type ?? this.collection?.repository.resourceType;

      const elem = getEntity(type, mapping as any, this.viewMode) as Component;
      return createElement(elem, settings);
    },
  };
}
