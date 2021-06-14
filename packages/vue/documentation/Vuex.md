# Vuex store plugin
Hyral provides a Vuex plugin that can be registered on creation. The plugin will create a module for each service
with the name `hyral_[service]`.

## Features
Each module will provide getters, mutations and actions for Resource and Collection:

Example functions for a service named `backend` with a book repository of `type`:

```javascript
// Get a resource.
$store.getters['hyral_backend/resource'](type)(id)

// Get a collection.
$store.getters['hyral_backend/collection'](type)(name)

// Commit an updated Resource to the store.
$store.commit('hyral_backend/SET_RESOURCE', resource)

// Any change to the Collection will be automatically committed and you generally will not need this mutation.
$store.commit('hyral_backend/SET_COLLECTION', collection)

// Will commit the resource to the store once loaded
$store.dispatch('hyral_backend/LOAD_RESOURCE', resource)

// Will commit collection to the store once loaded. 
$store.dispatch('hyral_backend/LOAD_COLLECTION', collection)
```

## Configuration

***Make sure all repositories are registered before passing the Vuex plugin to the Vuex store instance
creation.***

See [the Vuex documentation] on implementing the plugin in Vuex.

Example:
```javascript
// Assumes you have already defined your connectors and repositories.

import { repositoryManager } from '@hyral/core';
import { createVuexPlugin } from '@hyral/vue';

const hyralPlugin = createVuexPlugin(repositoryManager, 'book');

const store = new Vuex.Store({
  // ...
  plugins: [hyralPlugin]
})
```

[the Vuex documentation]: https://vuex.vuejs.org/guide/plugins.html
