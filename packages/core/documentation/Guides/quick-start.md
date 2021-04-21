# Quick start
A step-by-step guide for the basic Hyral features by code examples:

1. [Configuration](#configuration)
1. [Deleting a resource](#deleting-a-resource)
1. [Creating a resource](#creating-a-resource)
1. [Updating a resource](#updating-a-resource)
1. [Fetching resources](#fetching-resources)

## Configuration

```javascript
// create a configuration file (hyral.js for example) containing something like this.
// =========================================================================
import axios from 'axios';
import { HttpConnector, repositoryManager } from '@hyral/core';
import jsonApi from '@hyral/json-api';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url',
});

const connector = new HttpConnector(axiosInstance, jsonApi);

// Create a repository for each resource type you want to use.
export const bookRepository = repositoryManager.createRepository(connector, 'book');
export const authorRepository = repositoryManager.createRepository(connector, 'author');
export const productRepository = repositoryManager.createRepository(connector, 'product');
```

**More information**
* [Defining relational model]
* [Using different backends]
* [Transformers]
* [JSON:API integration]

## Fetching resources

Related topics for this section:
* [Resource definition]
* [Repository]
* [Collection]
* [ParameterBag]

### Find a single resource.
```javascript
import { bookRepository } from './hyral.js';
import { ParameterBag } from '@hyral/core';

const paramsFindOne = new ParameterBag();
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

### Fetching multiple resources
```javascript
import { bookRepository } from './hyral.js';
import { ParameterBag } from '@hyral/core';

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
import { Collection, ParameterBag } from '@hyral/core';
import { bookRepository } from './hyral.js';

const params = new ParamterBag();
const products = new Collection('products', bookRepository, params);
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
})
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
import { Resource, Task } from '@hyral/core';
import { bookRepository } from './hyral.js';

const author = new Resource(null, 'author', {
  'name': 'A great author',
});
const task = new Task('create', bookRepository, author)
bookRepository.create(task);
```

## Updating a resource

```javascript
import { Resource, Task } from '@hyral/core';
import { bookRepository } from './hyral.js';

// Assume the following resources have been loaded from a backend.
const author = new Resource(1, 'author', {
  'name': 'A great author',
});
const newAuthor = new Resource(1, 'author', {
  'name': 'Another great author',
});

const product = new Resource(2, 'book', {
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

const task = new Task('update', bookRepository, product)
bookRepository.update(task);
```

## Deleting a resource

```javascript
import { Resource, Task } from '@hyral/core';
import { bookRepository } from './hyral.js';

// Assume the following resources have been loaded from a backend.
const author = new Resource(1, 'author', {
  'name': 'A great author',
});

const task = new Task('delete', bookRepository, author);
bookRepository.delete(task);
```

[Defining relational model]: ../core/relationships.md
[Using different backends]: multiple-backends.md
[Transformers]: ../core/transformers.md
[JSON:API integration]: ../../../json-api/README.md
[Resource definition]: ../core/resource.md
[Repository]: ../core/repository.md
[Collection]: ../core/collection.md
[ParameterBag]: ../core/parameterBag.md
