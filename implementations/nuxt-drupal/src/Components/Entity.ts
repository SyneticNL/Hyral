import {
  CreateElement, Component, VNode, AsyncComponent,
} from 'vue';
import isFunction from 'lodash/isFunction';
import { IHyralEntity, IMapping } from '../__types__';
import ResourceMixin from '../Mixins/ResourceMixin';

/**
 * Uses HyralResourceMixin to fetch the required drupal data automatically
 * @param hyralService String
 * @param mapping IMapping
 *
 * @requires resourceAsProp? Resource
 * @requires viewMode? String
 */
export default function Entity(hyralService: string, mapping: IMapping): Component {
  return {
    name: 'Entity',
    mixins: [ResourceMixin(hyralService)],
    props: {
      viewMode: {
        type: String,
        required: false,
      },
    },
    computed: {
      mapping: () => (mapping.entities),
    },
    methods: {
      /**
       * Returns the component from the mapping according to the name of the component type
       *
       * @requires this.mapping Throws error if this.mapping is not present
       * @see this.mapping.fallback Returns renderless fallback component if name not found and mapping.fallback is not present
       */
      getEntity(name?: string): AsyncComponent | Component | null {
        const self = this as IHyralEntity;
        const viewMode = self.$props.viewMode ?? 'default';

        // If no mapping is present
        if (!self.mapping) {
          throw new Error('No computed mapping found');
        }

        // If the component is not found, return mapped fallback or renderless
        if (!name || !(name in self.mapping)) {
          return self.mapping.fallback
            ? self.mapping.fallback
            : null;
        }

        const mappingAsObject = self.mapping[name] as Record<string, AsyncComponent>;
        const mappingIsFunction = isFunction(mappingAsObject);

        // If mapping is function
        if (mappingIsFunction) {
          return self.mapping[name];
        }

        // If no default is present
        if (!mappingAsObject[viewMode]) {
          throw new Error(`No '${viewMode}' view mode value present in ${name} mapping.`);
        }

        return mappingAsObject[viewMode];
      },
    },
    render(createElement: CreateElement): VNode {
      const self = this as unknown as IHyralEntity;

      const settings = {
        props: { resource: self.resource },
        attrs: self.$attrs,
        class: [],
      };

      return createElement(self.getEntity(self.resource?.type), settings);
    },
  };
}
