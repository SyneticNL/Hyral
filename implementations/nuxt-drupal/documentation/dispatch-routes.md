# dispatchRoutes

The dispatch routes function is used within the context of a component, and can be passed a list of routes to retrieve in Drupal. 

Remember that if the routes are already retrieved, dispatchRoutes gets them from the current state.

### Example usage

```vue
<script>
import { dispatchRoutes } from '@hyral/nuxt-drupal';
// List of routestrings
import customRoutes from './customRoutes';

export default {
  mounted() {
    this.list = this.dispatchRoutes(customRoutes);
  },
  methods: {
    dispatchRoutes,
  },
};
</script>
```