# Resource repository

For each type of Resource a Repository must be created. When fetching resources for a resource type you can use 
the repository methods.

A Resource Repository is connected to one [Connector](connector.md) instance. Each Resource Repository can be connected
to a different Connector.

## repository manager

Each resource repository must be created via the repository manager as this creates a central storage for all
repositories.

## Example

```javascript
import axios from 'axios';
import HttpConnector from '@hyral/core/lib/Connector/HttpConnector';
import repositoryManager from '@hyral/core/lib/Resource/repositoryManager';
import jsonApi from '@hyral/json-api';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url',
});

const connector = HttpConnector.create(axiosInstance, jsonApi);

// Create a repository for each resource type you want to use.
export const bookRepository = repositoryManager.createRepository(connector, 'book');
export const authorRepository = repositoryManager.createRepository(connector, 'author');
export const productRepository = repositoryManager.createRepository(connector, 'product');
```
