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

[DrupalModule]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/module.md
[DrupalMixin]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/mixin.md
[DrupalMiddleware]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/middleware.md
[DrupalPlugin]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/plugin.md
[createWildcards]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/wildcards.md
[parseMenuCollection]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/menu-collection.md
[mapping]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/mapping.md
[Druxt]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/drupal/druxt.md
[CORS policy]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/drupal/cors.md
[jsonapi_menu_items]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/drupal/menu.md
[Quickstart Guide]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/implementations/nuxt-drupal/documentation/guides/quickstart.md