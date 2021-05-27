import { Resource } from '@hyral/core';
import { ResourceMixin } from '@hyral/vue';
import { CreateElement, Component } from 'vue';
import { IHyralEntity, IMapping } from '../__types__';

/**
 * Uses Hyral ResourceMixin to fetch the required drupal data automatically
 */
export default function HyralEntity(hyralService: string, mapping: IMapping): Component {
  return {
    name: 'HyralEntity',
    mixins: [ResourceMixin],
    props: {
      resourceAsProp: {
        type: Object,
        default(): Resource<unknown> {
          const self = this as IHyralEntity;
          const { route } = self.$store.state.druxtRouter;
          return new Resource(route.props.uuid, route.props.type);
        },
      },
    },
    computed: {
      mapping: () => (mapping.entities),
    },
    data(): { hyralService: string } {
      return {
        hyralService,
      };
    },
    methods: {
      /**
       * Returns the component from the mapping according to the name of the component type
       *
       * @requires this.mapping Throws error if this.mapping is not present
       * @see this.mapping.fallback Returns renderless fallback component if name not found and mapping.fallback is not present
       */
      getEntity(name?: string): Component {
        const self = this as IHyralEntity;

        if (!self.mapping) {
          throw new Error('No computed mapping found');
        }

        if (!name || !(name in self.mapping)) {
          return self.mapping.fallback ? self.mapping.fallback : null as unknown as Component;
        }

        return self.mapping[name];
      },
    },
    render(createElement: CreateElement): any {
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
