# Collection
A Collection is a managed way of working with a list of resources. It is connected to a [Repository] to fetch data.

## Features
Features / why using a collection makes sense:

* Exposes paging information on the fetched result
* Exposes metadata on the loading state
* Prevents unnecessary load on the API by only loading results if there are no results yet or the state of the 
[ParameterBag] has changed.
* A collection state can be serialized as it does not contain complex objects.

## Example
```javascript
import Collection from '@hyral/core/lib/Resource/Collection';
import { bookRepository } from './hyral.js';

const products = Collection.create('products', bookRepository);
products.setFilters([
  {
    field: 'type',
    value: 'ebook',
  },
]);
products.setSorting([{ field: 'title', direction: 'asc' }]);

// Maybe show a loading indicator while the isLoading property is true.
console.log(products.isLoading);

// Maybe grey out a section of the page while isLoaded is false.
console.log(products.isLoaded);

products.load().then(() => {
  console.log(products.items);
  console.log(products.pages);
  console.log(products.length);
});

products.load().then(() => {
  // As nothing changes the results are not loaded again and the promise resolves immediately.
  // Useful for when using a list of items in different contexts.
});
```

[Repository]: repository.md
[ParameterBag]: parameterBag.md
