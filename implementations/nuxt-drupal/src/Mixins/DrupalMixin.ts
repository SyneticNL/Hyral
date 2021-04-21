import { ResourceMixin } from '@hyral/vue';
import { IDrupalMixin } from '../__types__';
import Fallback from './Components/Fallback';

/**
 * Uses Hyral ResourceMixin to fetch the required drupal data automatically
 */
export default {
  mixins: [ResourceMixin],
  props: {
    uuid: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  data(): { id: string | number, resourceType: string, hyralService: string } {
    const self = this as unknown as IDrupalMixin;
    const { route } = self.$store.state.druxtRouter;

    // Converts props and / or druxtrouterstate into input for the @hyral/vue mixin
    return {
      id: self.uuid || route.props.uuid,
      resourceType: self.type || route.props.type,
      hyralService: 'drupal',
    };
  },
  methods: {
    /**
     * Returns the component from the mapping according to the name of the component type
     *
     * @requires this.mapping Throws error if this.mapping is not present
     * @see this.mapping.fallback Returns renderless fallback component if name not found and mapping.fallback is not present
     */
    getEntity(name: string): unknown {
      const self = this as unknown as IDrupalMixin;

      if (!self.mapping) {
        throw new Error('No computed mapping found');
      }

      if (!(name in self.mapping)) {
        return self.mapping.fallback ? self.mapping.fallback : Fallback;
      }

      return self.mapping[name];
    },
  },
};
