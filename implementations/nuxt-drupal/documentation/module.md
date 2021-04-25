# DrupalModule

DrupalModule is the main export of the implementation. Using the module implements the DruxtRouter module inside the application

-*note*-

DruxtRouter module is dependant on root options in the `nuxt.config.js`. Therefor until the dependency is removed and resolved this option also needs to be given. (You can also just pass in the `druxt-router` (see [DruxtRouter]) as an alternative)

## Example
The following example gives an indication on how to setup the module in the `nuxt.config.js`
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

[mapping]: mapping.md
[DruxtRouter]: druxt.md