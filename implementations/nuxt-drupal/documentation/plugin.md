# DrupalPlugin

The DrupalPlugin boots all services provided by the user. This is handled by passing along options as an argument:

```javascript
// drupal.js in plugins folder
import { DrupalPlugin } from '@hyral/nuxt-drupal';

export default DrupalPlugin(options);
```

## Registering
To register the plugin, the user needs to refer to the file in the `nuxt.config.js`.

### Example
Place the plugin in a new file inside the nuxt plugins folder:

`/plugins/drupal.js`

Register the plugin:
```javascript
export default {
  plugins: [
    '~/plugins/drupal.js',
  ],
}
```

## Options
The options that must be provided are the Drupal `baseUrl` and [mapping] with an optional `name`. Name will default to 'drupal' if not specified.

### Example
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



[mapping]: mapping.md