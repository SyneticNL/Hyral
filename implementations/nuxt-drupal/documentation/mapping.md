# Mapping
To provide the resources required for the implementation to work two factors need to be ensured.

1. Which repositories have to be created for a service to be added to the store
1. Which entities of Drupal can be mapped to what Nuxt component

In an effort to combine these two, a format has been made where the key of the mapping represents the resourceType (for more information check [Repository]), and an optional value represents each mapped component that handles the [Resource].

## Content
The content of the mapping is made up of a combination of the following:

* `Record<string, AsyncComponent>`
* `Record<string, Record<string, AsyncComponent>>`
* `Record<string, null>`

Important to note is that only async components are allowed. This is because the `mapping` is shared amongst all components.

## Usage
The `mapping` is passed along in the `options` of the [DrupalPlugin]. Next to that [Entity] requires this mapping present in the Nuxt application component to find the matching components within the `mapping`.

### Examples

An example format could be as short as this:
```javascript
export default {
  'paragraph--text': () => import('@/components/text.vue'),
  'node--event': null,
  'node--page': {
    default: () => import('@/components/page.vue'),
    teaser: () => import('@/components/teaser.vue'),
  },
  'menu_items': {
    sidebar: () => import('@/modules/drupal/components/menus/sidebar.vue'),
  },
};
```

A more extended mapping could have the following format using spread operators:
```javascript
import nodes from './nodes';
import menus from './menus';
import paragraphs from './paragraphs';
import media from './media';
import files from './files';

export default {
  ...nodes,
  ...menus,
  ...paragraphs,
  ...media,
  ...files,
};
```

[Repository]: ../../../packages/core/documentation/core/repository.md
[Resource]: ../../../packages/core/documentation/core/resource.md
[DruxtNuxtModule]: module.md
[DrupalMixin]: mixin.md
[DrupalPlugin]: plugin.md