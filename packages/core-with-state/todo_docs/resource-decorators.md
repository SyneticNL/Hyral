<!-- NOT CORRECT -->
# Resource decorators
Resource decorators add or change functionality on creation of a Resource via the `Resource.create` function.

## Bundled decorators
Hyral core bundles 2 decorators:

* Lazy loading decorator
* Relationships decorator

### Lazy loading decorator
The lazy loading decorator adds logic to a Resource that will trigger a load of the resource when accessing the `data`
property. When the load is finished the resource `data` will be refreshed on the Resource itself.

This feature is mainly meant to make showing a list of entities with relationships easier and makes a `hypermedia`
approach easier to implement. You don't have to include all entities in the first call when showing a list of books.
If you show the author on a book Hyral will lazy-load the author resource once the data is accessed. A UI framework
with reactive property watching (Vue for example) will automatically refresh your template once the author is loaded.

Enable this decorator by adding it to the Resource decorators.

```javascript
import lazyLoadingDecorator from '@hyral/core/lib/Resource/Decorator/Resource/lazyLoadingDecorator';
import Resource from '@hyral/core/lib/Resource/Resource';

Resource.decorators.push(lazyLoadingDecorator);
```

### Relationships decorator
This decorator enables defining the relationships once and not or Resource.create().

This decorator is NOT enabled by default as you have to configure it.

See [Relationships] for how to configure and use this decorator.

## Creating a new decorator
A decorator is a simple function that accepts a Resource and returns the same Resource. In your function you can add
functionalities to the Resource.

You can register the decorator by:

```javascript
import Resource from '@hyral/core/lib/Resource/Resource';

function resourceDecorator(resource) {
  // Do something with resource.

  return resource;
}

// Register the decorator.
Resource.decorators.push(resourceDecorator);
```

[Relationships]: relationships.md
