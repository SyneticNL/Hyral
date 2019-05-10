
export default {
  computed: {
    resource() {
      return this.$store.getters[`hyral-${this.resourceType}/resource`](this.id);
    },
  },
  serverPrefetch() {
    if (!this.id || !this.resourceType) {
      return Promise.reject();
    }

    return this.loadResource();
  },
  mounted() {
    if (!this.id || !this.resourceType) {
      return;
    }

    this.loadResource();
  },
  methods: {
    loadResource() {
      return this.$store.dispatch(`hyral-${this.resourceType}/LOAD_RESOURCE`, this.id);
    },
  },
};
