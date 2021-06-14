/**
 * Generic mixin to insert the content into the component
 */
export default {
  props: {
    resource: {
      type: Object,
      required: false,
    },
    collection: {
      type: Object,
      required: false,
    },
  },
};
