# Vue
Hyral provides various mixins to integrate resource and collection creation and loading when a component is created.

The implementation support Server Side Rendering.

The mixins require that the Vuex store modules are initialized.

## Resource mixin
When the properties, data entry or computed property `source` is defined a
resource is loaded via the Hyral Vuex store modules.

The resource is available via a computed property `resource`.

### Example
```javascript
const Component = Vue.extend({
  mixins: [ResourceMixin],
  data() {
    return {
      source: new Resource(5, 'book'),
    }
  },
});
```

### Global registration
You can also register the mixin globally:

```javascript
Vue.mixin(ResourceMixin);
```

Use the mixin as described in the above example.


### Catching errors
You can catch errors for the mixin by overriding the loadResource as in this example:
```javascript
const Component = Vue.extend({
  mixins: [ResourceMixin],
  data() {
    return {
      source: new Resource(5, 'book'),
    }
  },
  methods: {
    loadResource() {
      HyralResourceMixin.methods.loadResource.call(this).catch(() => {
        console.log('error');
      });
    },
  },
});
```

## Collection mixin
When the properties, data entries or computed properties `collectionName`, `resourceType` and `hyralService` are 
defined a collection is created and the items loaded via the Hyral Vuex store modules.

You can also provide a data entry or computed property `parameterBag` to filter the collection.

### Example
```javascript
const Component = Vue.extend({
  mixins: [HyralCollectionMixin],
  data() {
    return {
      collectionName: 'books',
      resourceType: 'book',
      hyralService: 'service',
    }
  },
  computed: {
    parameterBag() {
      const parameterBag = ParameterBag();

      parameterBag.addFilter({ field: 'category', value: 'science-fiction' });
      parameterBag.setSorting([{ field: 'title', direction: 'asc'} ]);

      return parameterBag;
    },
  },
});
```

### Global registration
You can also register the mixin globally:

```javascript
Vue.mixin(CollectionMixin);
```

Use the mixin as described in the above example.

### Catching errors
You can catch errors for the mixin by overriding the loadResource as in this example:
```javascript
const Component = Vue.extend({
  mixins: [CollectionMixin],
  data() {
    return {
      collectionName: 'books',
      resourceType: 'book',
      hyralService: 'service',
    }
  },
  methods: {
    loadCollection() {
      HyralCollectionMixin.methods.loadCollection.call(this).catch(() => {
          console.log('error');
      });
    },
  },
});
```
