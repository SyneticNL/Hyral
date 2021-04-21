# createWildcards
This is an exported function to create a bunch of wildcards on the fly for the `vue-router`.

*params*: 

- depth
- component

### Example
In the next example you can see a static non-drupal page being added as well as a custom page for a drupal route called `components` and `wildcard` routes with depth three that handles the undefined Drupal pages.

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

In this example a `wildcard` route was created with the following endpoints:

```javascript
[
  {
    name: 'drupal_1', path: '/:wildcard_1', drupalComponent, props: { drupal: true },
  },
  {
    name: 'drupal_2', path: '/:wildcard_1/:wildcard_2', drupalComponent, props: { drupal: true },
  },
  {
    name: 'drupal_3', path: '/:wildcard_1/:wildcard_2/:wildcard_3', drupalComponent, props: { drupal: true },
  },
];
```