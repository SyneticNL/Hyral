# parseMenuCollection

This exported function returns the hierarchy to the menu items returned from [jsonapi_menu_items].

_params_:

- menu [collection]

### Example

```vue
<template>
  <nav>
    <MenuItem
      v-for="item in parseMenuCollection(collection)"
      :key="item.title"
      :to="item.url"
    >
      {{ item.title }}
    </MenuItem>
  </nav>
</template>

<script>
import MenuItem from "./menuItem.vue";
import { parseMenuCollection } from "@hyral/nuxt-drupal";
import { CollectionMixin } from "@hyral/vue";

export default {
  mixins: [CollectionMixin],
  components: {
    MenuItem,
  },
  data() {
    return {
      hyralService: "drupal",
      collectionName: "main",
      resourceType: "menu_items/main",
    };
  },
  methods: {
    parseMenuCollection,
  },
};
</script>
```

[jsonapi_menu_items]: drupal/menu.md
[collection]: ../../../packages/core/documentation/Core/collection.md
