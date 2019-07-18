
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
  /**
   * Execute server prefetch actions.
   *
   * Returns the Promise from the action so that the component waits before rendering.
   *
   * @returns {Promise}
   */
  serverPrefetch() {
    if (!this.collectionName || !this.resourceType) {
      return Promise.reject();
    }

    this.initCollection();

    return this.loadCollection();
  },
  mounted() {
    if (!this.collectionName || !this.resourceType) {
      return;
    }

    this.initCollection();
    this.loadCollection();
  },
  methods: {
    initCollection() {
      this.$store.commit(`hyral_${this.resourceType}/SET_COLLECTION`, this.collection);
    },
    loadCollection() {
      return this.collection.load();
    },
  },
};
