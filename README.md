# Hyral

Hyral (Hypermedia Resource oriented Api Layer) is an advanced but easy to use abstraction layer over one or more API
backends.

## Features
* Framework agnostic
* Backend agnostic
* ORM-like interface and features
* Hypermedia oriented
* Support for multiple backends with 1 interface
* Full test-coverage
* Modern codebase with immutability, state management and promises

## Additional features:
* [JsonApi backend integration with automatic relationship handling](packages/json-api/README.md)
* [Vue(x) integration](packages/vue/README.md)

## Getting started

### Install

```bash
npm install @hyral/core

// JSON-API support
npm install @hyral/json-api

// Vue(x) integration
npm install @hyral/vue
```

### Configuration

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
* Defining relational model
* Using different backends
* Transformers
* JSON API integration

### Quick start

#### Fetching resources

```javascript
// Fetching mutliple resources.
// =========================================================================
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

```javascript
// Find a single resource.
// =========================================================================
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

```javascript
// Fetch a single resource by ID
// =========================================================================

import { bookRepository } from './hyral.js';

bookRepository.findById('2').then((resource) => {
  console.log(resource);
});
```

**More information**
* Resource definition
* Using a ParameterBag

#### Creating a resource

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

#### Updating a resource

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

**More information**
* Creating/updating/deleting resources
* Defining relational model

#### Deleting a resource

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

**More information**
* Creating/updating/deleting resources

## More

* [Code documentation](packages/core/documentation/README.md)
