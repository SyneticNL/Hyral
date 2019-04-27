
export default {
  computed: {
    collection() {
      const collection = this.$store.getters[`hyral-${this.resourceType}/collection`](this.collectionName);

      if (!this.parameterBag) {
        return collection;
      }

      collection.parameterBag = this.parameterBag;

      return collection;
    },
  },
  serverPrefetch() {
    if (!this.collectionName || !this.resourceType) {
      return Promise.reject();
    }

    // return the Promise from the action
    // so that the component waits before rendering
    return this.loadResource();
  },
  mounted() {
    if (!this.collectionName || !this.resourceType) {
      return;
    }

    this.loadResource();
  },
  methods: {
    loadResource() {
      return this.collection.load();
    },
  },
};
