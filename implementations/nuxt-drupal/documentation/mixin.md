# ContentMixin
The ResourceMixin is a function that extends the [Mixins] from `hyral/vue` by providing a param `hyralService` and a `source` prop that defaults to the current route from [Druxt] when the `root` attribute is set to true.

## Usage

```vue
<script>
import { ResourceMixin } from '@hyral/nuxt-drupal';

export default {
  mixins: [ResourceMixin('drupal')],
};
</script>
```

[Mixins]: https://github.com/SyneticNL/Hyral/blob/v2.0.0-prerelease/packages/vue/documentation/Vue.md
[Druxt]: ./druxt.md