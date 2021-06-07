# ResourceMixin
The ResourceMixin is a function that extends the [ResourceMixin] from `hyral/vue` by providing a param `hyralService` and a `source` prop that defaults to the current route from [Druxt].

## Usage

```vue
<script>
import { ResourceMixin } from '@hyral/nuxt-drupal';

export default {
  mixins: [ResourceMixin('drupal')],
};
</script>
```

[ResourceMixin]: https://github.com/SyneticNL/Hyral/blob/v2.0.0-prerelease/packages/vue/documentation/Vue.md
[Druxt]: ./druxt.md