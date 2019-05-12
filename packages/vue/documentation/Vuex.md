# Vuex store plugin
Hyral provides a Vuex plugin that can be registered on creation.

Make sure all repositories are registered before passing the Vuex plugin to the Vuex store instance
creation.

See [the Vuex documentation](https://vuex.vuejs.org/guide/plugins.html) on implementing the plugin
in Vuex.

## Example

Example of the creation of a plugin:

```
import axios from 'axios';
import { createHttpConnector, jsonApiTransformers, resourceManager } from 'hyral';
import createVuexPlugin from '../hyral/createVuexPlugin';

const axiosInstance = axios.create({
  baseURL: 'http://api.localhost/jsonapi',
});

const connector = createHttpConnector(
  axiosInstance,
  {
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  },
);

try {
  resourceManager.createRepository(connector, 'faq');
  resourceManager.createRepository(connector, 'product');
  resourceManager.createRepository(connector, 'article');
} catch (e) {
  console.error(e);
}
const hyralPlugin = createVuexPlugin(resourceManager);
```
