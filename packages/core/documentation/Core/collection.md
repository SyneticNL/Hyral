# Collection

A Collection is a managed way of working with a list of resources. It is connected to a 
[Resource Repository](repository.md) to fetch data.

A Collection 

## Features
* Only load results if not loaded previously or the state of the parameter bag has changed
* Exposes paging information on the fetched result

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

products.load(() => {
  console.log(products.items);
  console.log(products.pages);
  console.log(products.length);
});

products.load(() => {
  // As nothing changes the results are not loaded again and the promise resolves immediately.
  // Useful for when using a list of items in different contexts.
});
```
