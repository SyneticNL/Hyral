# Multiple backend

Hyral supports multiple backends by creating multiple connectors. Each repository can only have 1 connector (for now)
but each repository can have a different connector.


## Implementation
You need to create a separate connector for each backend with the appropriate transformer, each connector/backend can 
have different transformers.

Each repository must be connected to a connector. With Hyral you will always request resources via the repositories and
therefore Hyral will automatically switch backend based on which repository you use. 

## Exmaple

```javascript
import axios from 'axios';
import HttpConnector from '@hyral/core/lib/Connector/HttpConnector';
import repositoryManager from '@hyral/core/lib/Resource/repositoryManager';
import jsonApi from '@hyral/json-api';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url',
});

const connector = HttpConnector.create(axiosInstance, jsonApi);

const axiosInstance2 = axios.create({
  baseURL: 'https://another-api-url',
});

const connector2 = HttpConnector.create(axiosInstance2, jsonApi);

export const bookRepository = repositoryManager.createRepository(connector, 'book');
export const authorRepository = repositoryManager.createRepository(connector2, 'author');
export const productRepository = repositoryManager.createRepository(connector2, 'product');
```

