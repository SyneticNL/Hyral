import { Resource } from '@hyral/core';
import { ResourceMixin as RootResourceMixin, CollectionMixin as RootCollectionMixin } from '@hyral/vue';
import { IHyralEntity } from '../__types__';

/**
 * Uses ResourceMixin and CollectionMixin to fetch the required drupal data automatically
 */
export default function ContentMixin(hyralService: string): any {
  return {
    mixins: [RootResourceMixin, RootCollectionMixin],
    props: {
      source: {
        type: Object,
        default(this: IHyralEntity): Resource<unknown> {
          const { route } = this.$store.state.druxtRouter;
          return new Resource(route.props.uuid, route.props.type);
        },
      },
    },
    watch: {
      source(this: IHyralEntity) {
        if (this.collection) {
          this.loadCollection();
        }
        if (this.resource) {
          this.loadResource();
        }
      },
    },
    data(): { hyralService: string } {
      return {
        hyralService,
      };
    },
  };
}
