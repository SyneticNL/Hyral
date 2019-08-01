import Collection from '@hyral/core/lib/Resource/Collection';

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
  created() {
    this.initCollection();
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

    return this.loadCollection();
  },
  mounted() {
    if (!this.collectionName || !this.resourceType) {
      return;
    }

    this.loadCollection();
  },
  methods: {
    initCollection() {
      this.$store.commit(`hyral_${this.resourceType}/SET_COLLECTION`, Collection.create(this.collectionName));
    },
    loadCollection() {
      return this.collection.load();
    },
  },
};
