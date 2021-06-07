# Quickstart
Follow these examples to enable the coupling.

### Step 1:
Install the dependencies

```
npm install @hyral/nuxt-drupal
```

### Step 2:
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

### Step 3:
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

### Step 4:
Write the middleware (see [DrupalMiddleware])
```javascript
// drupal.js in middleware folder
import { DrupalMiddleware } from '@hyral/nuxt-drupal';

export default DrupalMiddleware;
```

### Step 5:
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

### Step 6:
Write the Entity (see [Entity])
```javascript
// This component can now be used throughout the Nuxt application
import { Entity } from '@hyral/nuxt-drupal';
import mapping from '@/modules/drupal/mapping';

export default Entity('drupal', mapping);
```

### Step 7: 
Create wildcards and custom endpoints in the router (see [createRoute])
```javascript
import Entity from './entity';
import { createRoute } from '@hyral/nuxt-drupal';

export const createRouter = () => new Router({
  routes: [
    {
      path: '/default',
      component: Default,
    },
    createRoute({
      path: '/:wildcard',
      component: Entity,
    }),
  ],
});
```

[DrupalModule]: ../module.md
[DrupalPlugin]: ../plugin.md
[DrupalMiddleware]: ../middleware.md
[createRoute]: ../route.md
[Entity]: ../entity.md