# Resource repository
For each type of Resource a Repository must be created. When fetching resources for a resource type you can use 
the repository methods.

For example: if you have resources of the types book, author and product you will need to create a repository for each 
one. 

*Connector*
A Resource Repository is connected to one [Connector] instance. Each Resource Repository can be connected
to a different Connector.

## Repository Manager
Each resource repository must be created via the repository manager as this creates a central storage for all
repositories. The Repository Manager is used in various places in Hyral.

## Example

```javascript
import axios from 'axios';
import { repositoryManager, HttpConnector } from '@hyral/core';
import jsonApi from '@hyral/json-api';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url',
});

const connector = new HttpConnector(axiosInstance, jsonApi);

// Create a repository for each resource type you want to use.
export const bookRepository = repositoryManager.createRepository(connector, 'book');
export const authorRepository = repositoryManager.createRepository(connector, 'author');

// If the ID field is different pass it as the 3rd argument.
export const productRepository = repositoryManager.createRepository(connector, 'product', 'isbn');
```


[Connector]: connector.md
[lazy loading]: resource-decorators.md
[ChangeSet]: changeSet.md
