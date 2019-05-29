# Vuex store plugin
Hyral provides a Vuex plugin that can be registered on creation. The plugin will create a module for each repository
with the name `hyral_[resource type]`.

## Features
Each module will provide getters, mutations and actions for Resource and Collection:

Example functions for a book repository:

```javascript
// Get a resource (loaded or not).
$store.getters['hyral_book/resource'](id)

// Get a collection (will provision if  it does not exist).
$store.getters['hyral_book/collection'](name)

// Commit an updated Resource to the store.
$store.commit('hyral_book/SET_RESOURCE', resource)

// Any change to the Collection will be automatically committed and you generally will not need this mutation.
$store.commit('hyral_book/SET_COLLECTION', collection)

// Will commit the resource to the store once loaded.
$store.dispatch('hyral_book/LOAD_RESOURCE', id)

// Will trigger the collection.load() method. You can also just call the load method directly.
$store.dispatch('hyral_book/LOAD_COLLECTION', name)
```

## Configuration

***Make sure all repositories are registered before passing the Vuex plugin to the Vuex store instance
creation.***

See [the Vuex documentation](https://vuex.vuejs.org/guide/plugins.html) on implementing the plugin
in Vuex.

Example of the creation of a plugin:

```
// Assumes you have already defined your connectors and repositories.

import repositoryManager from '@hyral/core/lib/Resource/repositoryManager';
import createVuexPlugin from '@hyral/vue/lib/createVuexPlugin';

const hyralPlugin = createVuexPlugin(repositoryManager);

const store = new Vuex.Store({
  // ...
  plugins: [hyralPlugin]
})
```
