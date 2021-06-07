# DrupalMiddleware
The `DrupalMiddleware` uses [DruxtRouter] and the routes created by [createRoute] to map routes from Drupal to a route in the `vue-router`. 

It looks for meta on the route to see if it matches either a static `route` or `wildcard` with meta `{ services:  ['drupal'] }`. It also uses `resolve` if it is present to resolve the route to Drupal.

To create the routes required for the middleware to handle the routes it is recommended to create the routes using the [createRoute] function.

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
[createRoute]: route.md