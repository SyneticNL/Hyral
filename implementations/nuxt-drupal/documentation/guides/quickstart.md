# Quickstart
Follow these examples to enable the coupling.

## Step 1:
Install the dependencies

```
npm install @hyral/core @hyral/json-api @hyral/vue @hyral/nuxt-drupal
```

## Step 2:
Register the module and provide the baseUrl (see [DrupalModule])
```javascript
export default {
  modules: [
    '@hyral/nuxt-drupal',
  ],
  druxt: {
    baseUrl: process.env.DRUPAL_BASE_URL,
  },
}
```

## Step 3:
Write the plugin and provide the options (see [DrupalPlugin])
```javascript
// drupal.js in plugins folder
import { DrupalPlugin } from '@hyral/nuxt-drupal';
import mapping from './mapping';

const options = {
  mapping,
  baseUrl: process.env.DRUPAL_BASE_URL,
  name: 'drupal',
};

export default DrupalPlugin(options);
```

## Step 4:
Write the middleware (see [DrupalMiddleware])
```javascript
// drupal.js in middleware folder
import { DrupalMiddleware } from '@hyral/nuxt-drupal';

export default DrupalMiddleware;
```

## Step 5:
Register the middleware and plugin in `nuxt.config.js`
```javascript
// nuxt.config.js
export default {
  modules: [
    '@hyral/nuxt-drupal',
  ],
  druxt: {
    baseUrl: process.env.DRUPAL_BASE_URL,
  },
  router: {
    middleware: ['drupal'],
  },
  plugins: [
    '~/plugins/drupal.js',
  ],
};
```

## Step 6: 
Create wildcards and custom endpoints in the router (see [createWildcards])
```javascript
export const createRouter = () => new Router({
  routes: [
    {
      path: '/default',
      name: 'default', // Non drupal page
      component: component1,
    },
    {
      path: '/components',
      name: 'custom', // Custom page with drupal resources
      component: drupalCustomComponent,
      props: {
        drupal: true,
      },
    },
    ...createWildcards(3, drupalComponent),
  ],
});
```
## Step 7:
Write the mixin to use in components (see [DrupalMixin])
```javascript
// This mixin can now be used throughout the Nuxt application
import { DrupalMixin } from '@hyral/nuxt-drupal';
import mapping from './mapping';

export default {
  mixins: [DrupalMixin],
  computed: {
    mapping: () => (mapping.entities),
  },
};
```

[DrupalModule]: ../module.md
[DrupalPlugin]: ../plugin.md
[DrupalMiddleware]: ../middleware.md
[createWildcards]: ../wildcards.md
[DrupalMixin]: ../mixin.md