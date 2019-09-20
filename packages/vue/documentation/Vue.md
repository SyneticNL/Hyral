# Vue
Hyral provides various mixins to integrate resource and collection creation and loading when a component is created.

The implementation support Server Side Rendering.

The mixins require that the Vuex store modules are initialized.

## Resource mixin
When the properties, data entries or computed properties `id` and `resourceType` are defined a
resource is loaded via the Hyral Vuex store modules.

The resource is available via a computed property `resource`.

### Example
```javascript
const Component = Vue.extend({
  mixins: [HyralResourceMixin],
  data() {
    return {
      id: 5,
      resourceType: 'book',
    }
  },
});
```

### Global registration
You can also register the mixin globally:

```javascript
Vue.mixin(HyralResourceMixin);
```

Use the mixin as described in the above example.


### Catching errors
You can catch errors for the mixin by overriding the loadResource as in this example:
```javascript
const Component = Vue.extend({
  mixins: [HyralResourceMixin],
  data() {
    return {
      id: 5,
      resourceType: 'book',
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
When the properties, data entries or computed properties `collectionName` and `resourceType` are 
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
Vue.mixin(HyralCollectionMixin);
```

Use the mixin as described in the above example.

### Catching errors
You can catch errors for the mixin by overriding the loadResource as in this example:
```javascript
const Component = Vue.extend({
  mixins: [HyralCollectionMixin],
  data() {
    return {
      collectionName: 'books',
      resourceType: 'book',
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
