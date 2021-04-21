# Nuxt-Drupal
[![npm version](https://badge.fury.io/js/%40hyral%2Fnuxt-drupal.svg)](https://badge.fury.io/js/%40hyral%2Fnuxt-drupal)
[![Hyral vue](https://badgen.net/bundlephobia/minzip/@hyral/nuxt-drupal)](https://bundlephobia.com/result?p=@hyral/nuxt-drupal)

Nuxt-Drupal is the implementation of Hyral packages for direct usage in a coupling between Nuxt and Drupal

### Install
```bash
npm install @hyral/nuxt-drupal
```

# Documentation
This implementation gives support for the quick implementation of a coupling between Nuxt and Drupal. It consists of various entities, with the main being the DrupalNuxtModule. Added entities are the DrupalMixin, DrupalMiddleware and createWildcards.

!important! This implementation requires a [MAPPING] in order to work

* [DrupalNuxtModule]
* [DrupalMixin]
* [DrupalMiddleware]
* [createWildcards]

# Drupal Requirements
* [Druxt]
* [CORS policy]

[DrupalNuxtModule]: documentation/module.md
[DrupalMixin]: documentation/mixin.md
[DrupalMiddleware]: documentation/middleware.md
[createWildcards]: documentation/wildcards.md
[MAPPING]: documentation/mapping.md
[Druxt]: documentation/drupal/druxt.md
[CORS policy]: documentation/drupal/cors.md