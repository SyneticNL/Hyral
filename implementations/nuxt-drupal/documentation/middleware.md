# DrupalMiddleware
The `DrupalMiddleware` uses [DruxtRouter] and the wildcards created by [createWildcards] to map routes from Drupal to a route in the `vue-router`. 

The `DrupalMiddleware` looks for a prop on the resolved route retrieved from Drupal to see if it matches either a static `route` or `wildcard` with prop `drupal: true`.

To create the wildcards required for the middleware to handle the depth of routes it is recommended to create the wildcards using the [createWildcards] function.

## Usage
```javascript
// Example 'middleware' folder Nuxt
import { DrupalMiddleware } from '@hyral/nuxt-drupal';

export default DrupalMiddleware;
```

```javascript
// Example in nuxt.config.js
export default {
  router: {
    middleware: ['drupal'],
  },
};
```

[DruxtRouter]: druxt.md
[createWildcards]: wildcards.md