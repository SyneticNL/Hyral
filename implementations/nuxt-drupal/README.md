# Nuxt-Drupal
[![npm version](https://badge.fury.io/js/%40hyral%2Fnuxt-drupal.svg)](https://badge.fury.io/js/%40hyral%2Fnuxt-drupal)
[![Hyral vue](https://badgen.net/bundlephobia/minzip/@hyral/nuxt-drupal)](https://bundlephobia.com/result?p=@hyral/nuxt-drupal)

Nuxt-Drupal is the implementation of Hyral packages for direct usage in a coupling between Nuxt and Drupal

### Install
```bash
npm install @hyral/nuxt-drupal
```

# Documentation
This implementation gives support for the quick implementation of a coupling between Nuxt and Drupal. It consists of various entities, with the main being the DrupalModule. Added entities are the DrupalMixin, DrupalMiddleware, DrupalPlugin and createWildcards.

**!important!** This implementation requires a [mapping] in order to work

* [DrupalModule]
* [DrupalMixin]
* [DrupalMiddleware]
* [DrupalPlugin]
* [createWildcards]
* [parseMenuCollection]

# Quickstart
For a complete guide please look at the [Quickstart Guide]

# Drupal Requirements
* [Druxt]
* [CORS policy]
* [jsonapi_menu_items] (optional)

[DrupalModule]: documentation/module.md
[DrupalMixin]: documentation/mixin.md
[DrupalMiddleware]: documentation/middleware.md
[DrupalPlugin]: documentation/plugin.md
[createWildcards]: documentation/wildcards.md
[parseMenuCollection]: documentation/menu-collection.md
[mapping]: documentation/mapping.md
[Druxt]: documentation/drupal/druxt.md
[CORS policy]: documentation/drupal/cors.md
[jsonapi_menu_items]: documentation/drupal/menu.md
[Quickstart Guide]: documentation/guides/quickstart.md