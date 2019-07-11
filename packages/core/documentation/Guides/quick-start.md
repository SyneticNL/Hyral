# Quick start

## Configuration

```javascript
// create a configuration file (hyral.js for example) containing something like this.
// =========================================================================
import axios from 'axios';
import HttpConnector from '@hyral/core/lib/Connector/HttpConnector';
import repositoryManager from '@hyral/core/lib/Resource/repositoryManager';
import jsonApi from '@hyral/json-api';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url',
});

const connector = HttpConnector(axiosInstance, jsonApi);

// Create a repository for each resource type you want to use.
export const bookRepository = repositoryManager.createRepository(connector, 'book');
export const authorRepository = repositoryManager.createRepository(connector, 'author');
export const productRepository = repositoryManager.createRepository(connector, 'product');
```

**More information**
* [Defining relational model](../Core/relationships.md)
* [Using different backends](multiple-backends.md)
* [Transformers](../Core/transformers.md)
* [JSON API integration](../../../json-api/README.md)

## Fetching resources

More information:
* [Resource definition](../Core/resource.md)
* [Repository](../Core/repository.md)
* [Collection](../Core/collection.md)
* [Using a ParameterBag](../Core/parameterBag.md)

### Fetching mutliple resources

```javascript
import { bookRepository } from './hyral.js';

// Filters, sorting, paging and other params are set using a parameterBag.
const params = ParameterBag();
params.setFilters([
  {
    field: 'type',
    value: 'ebook',
  },
]);
params.setSorting([{ field: 'title', direction: 'asc' }]);

bookRepository.find(params).then((resources) => {
  console.log(resources);
});
```

Using a Collection for additional features regarding loading state and paging.

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

console.log(products.isLoading);

products.load().then(() => {
  console.log(products.items);
  console.log(products.pages);
  console.log(products.length);
})
```

### Find a single resource.

```javascript
import { bookRepository } from './hyral.js';

const paramsFindOne = ParameterBag();
paramsFindOne.setFilters([
  {
    field: 'title',
    value: 'A great book',
  },
]);

bookRepository.findOne(paramsFindOne).then((resource) => {
  console.log(resource);
});
```

### Fetch a single resource by ID
```javascript

import { bookRepository } from './hyral.js';

bookRepository.findById('2').then((resource) => {
  console.log(resource);
});
```


## Creating a resource

```javascript
import Resource from '@hyral/core/lib/Resource/Resource';

const author = Resource.create(null, 'author', {
  'name': 'A great author',
});

const product = Resource.create(null, 'book', {
  title: 'A great product',
  price: 200,
  author,
}, {
  author: {
    cardinality: 'many-to-one',
    many: false,
    resource: 'author',
  },
});

// Create ChangeSet to queue changes.
const changeSet = ChangeSet.create();

// persistCascade will also create the author resource.
changeSet.persistCascadeResource(product);

// Send all queued changes to the backend.
changeSet.execute().then(() => {
  // The author and product instances will be updated and now have an ID.
  console.log('resources created!');
});
```

## Updating a resource

```javascript
import Resource from '@hyral/core/lib/Resource/Resource';

// Assume the following resources have been loaded from a backend.
const author = Resource.create(1, 'author', {
  'name': 'A great author',
});
const newAuthor = Resource.create(1, 'author', {
  'name': 'Another great author',
});

const product = Resource.create(2, 'book', {
  title: 'A great product',
  price: 200,
  author,
}, {
  author: {
    cardinality: 'many-to-one',
    many: false,
    resource: 'author',
  },
});

// You need to overwrite the complete data object, never alter a property of the data object itself!
product.data = {
  title: 'An even greater book',
  pages: 300,
  author: newAuthor,
};

// Create ChangeSet to queue changes.
const changeSet = ChangeSet.create();

// Use persistChange to only commit changes to the passed resource.
changeSet.persistResource(product);

// Send all queued changes to the backend.
changeSet.execute().then(() => {
  // The author and product instances will be updated and now have an ID.
  console.log('resources created!');
});
```

## Deleting a resource

```javascript
import Resource from '@hyral/core/lib/Resource/Resource';

// Assume the following resources have been loaded from a backend.
const author = Resource.create(1, 'author', {
  'name': 'A great author',
});

// Create ChangeSet to queue changes.
const changeSet = ChangeSet.create();

changeSet.deleteResource(product);

// Send all queued changes to the backend.
changeSet.execute().then(() => {
  // The author and product instances will be updated and now have an ID.
  console.log('resources created!');
});
```
