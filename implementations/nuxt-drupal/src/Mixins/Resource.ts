import { Resource } from '@hyral/core';
import { ResourceMixin as RootMixin } from '@hyral/vue';
import { IHyralEntity } from '../__types__';

/**
 * Uses ResourceMixin to fetch the required drupal data automatically
 */
export default function ResourceMixin(hyralService: string): any {
  return {
    mixins: [RootMixin],
    props: {
      source: {
        type: Object,
        default(): Resource<unknown> {
          const self = this as unknown as IHyralEntity;
          const { route } = self.$store.state.druxtRouter;
          return new Resource(route.props.uuid, route.props.type);
        },
      },
    },
    data(): { hyralService: string } {
      return {
        hyralService,
      };
    },
  };
}
