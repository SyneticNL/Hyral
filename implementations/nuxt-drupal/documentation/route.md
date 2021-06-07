# createRoute
This is an exported function to create routes for the `vue-router` with the correct `meta` used by the [DrupalMiddleware]. As a `@param` a regular Vue route can be passed along which can be augmented with a `resolve`.


## resolve
The `resolve` attribute on the route will be taken to resolve a difference between the route in the front-end and the resolved route in Drupal. It can take wildcards in the same manner as the normal `path` attribute.

## Entity
[Entity] can be used to dynamically render the correct component and can be passed along to the `createRoute` function in the component attribute.

## Example
In the next example you can see a static non-drupal page being added as well as a custom page for a drupal route called `components` and `wildcard` routes with depth three that handles the undefined Drupal pages.

```javascript
import Entity from './entity';
import { createRoute } from '@hyral/nuxt-drupal';

export const createRouter = () => new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    // A Drupal route which has the same path
    createRoute({
      path: '/events',
      component: Events,
    }),
    // A route that resolves into a different Drupal path
    createRoute({
      path: '/artices/news',
      component: News,
      resolve: '/news',
    }),
    // A wildcard that resolves into a different Drupal path and dynamically load the correct component
    createRoute({
      path: '/users/:wildcard/details',
      component: Entity,
      resolve: '/:wildcard',
    }),
  ],
});
```

In this example `routes` were created with the following:

```javascript
[
  {
    path: '/', component: Home, meta: { services: ['drupal'] },
  },
  {
    path: '/artices/news', component: News, meta: { services: ['drupal'], resolve: '/news' },
  },
  {
    path: '/users/:wildcard/details', component: Entity, meta: { services: ['drupal'], resolve: '/:wildcard' },
  },
];
```

[DrupalMiddleware]: middleware.md
[Entity]: entity.md