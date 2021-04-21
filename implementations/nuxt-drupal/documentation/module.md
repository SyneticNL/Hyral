# DruxtNuxtModule

Being the main export of the implementation, the DruxtNuxtModule gives the opportunity to setup a lot of the implementation of Hyral by default.

## Mapping
The [mapping] is the single source of truth when it comes to settings provided by the user. For more info please check the [mapping] documentation on how to set it up.

## Example
The following example gives an indication on how to setup the module in the nuxt.config.js
```javascript
// The base url of drupal ex: http://yourdrupalinstance.org
const baseUrl = process.env.DRUPAL_BASE_URL;
// The mapping of all services
const mapping = require('./mapping');

export default {
   modules: [
    ['@hyral/nuxt-drupal', { mapping, baseUrl }],
  ],
}
```

[mapping]: mapping.md