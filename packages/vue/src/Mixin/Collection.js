
export default {
  computed: {
    collection() {
      const collection = this.$store.getters[`hyral_${this.resourceType}/collection`](this.collectionName);

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
    return this.loadCollection();
  },
  mounted() {
    if (!this.collectionName || !this.resourceType) {
      return;
    }

    this.loadCollection();
  },
  methods: {
    loadCollection() {
      return this.collection.load();
    },
  },
};
