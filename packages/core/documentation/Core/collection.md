# Collection
A Collection is a managed way of working with a list of resources. It is connected to a [Repository] to fetch data. The ParameterBag can be optionally provided or the collection will create a fresh bag.

## Example
```javascript
import { Collection, ParameterBag } from '@hyral/core';
import { bookRepository } from './hyral.js';

const params = new ParameterBag();
const products = new Collection('products', 'product', bookRepository, params);
products.parameterBag.setFilters([
  {
    field: 'type',
    value: 'ebook',
  },
]);
products.parameterBag.setSorting([{ field: 'title', direction: 'asc' }]);

products.load().then(() => {
  console.log(products.items);
  console.log(products.pages);
  console.log(products.length);
});
```

[Repository]: repository.md
[ParameterBag]: parameterBag.md
