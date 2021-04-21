# Mapping
To provide the resources required for the implementation to work two factors need to be ensured.

1. Which repositories have to be created for a service to be added to the store
1. Which entities of Drupal can be mapped to what Nuxt component

In an effort to combine these two, a format has been made where the key of the mapping represents the resourceType (for more information check [Repository]), and an optional value represents each mapped component that handles the [Resource].

## Content
The content of the mapping is made up of the following:

* The nodes that are available for each page within the Drupal JSON:API
* The menus that are available within the Drupal JSON:API
* The entities that are available and are mapped to components

## Usage
The `mapping` is passed along in the `moduleOptions` of the [DruxtNuxtModule]. Next to that the [DrupalMixin] requires this mapping present in the Nuxt application components to find the matching components within the entities.
<br/>
<br/>
### Examples
The following format is required for a mapping to work correctly:

```typescript
export default {
  nodes: Array,
  menus: Array,
  entities: Record<string, Object>,
};
```

An example format could be as short as this:
```javascript
export default {
  nodes: [
    'node--page',
  ],
  menus: [
    'menu--menu',
  ]
  entities: {
    'paragraph--text': () => import('@/components/text.vue'),
  },
};
```

A more extended mapping could have the following format:
```javascript
import nodes from './nodes';
import menus from './menus';

import paragraphs from './paragraphs';
import media from './media';
import files from './files';

export default {
  nodes,
  menus,
  entities: {
    ...paragraphs,
    ...media,
    ...files,
  },
};
```

[Repository]: ../../../packages/core/documentation/core/repository.md
[Resource]: ../../../packages/core/documentation/core/resource.md
[DruxtNuxtModule]: module.md
[DrupalMixin]: mixin.md