# Readme

Example of the creation of a plugin:

```
import axios from 'axios';
import { createHttpConnector, jsonApiTransformers, RepositoryManager } from 'hyral';
import createVuexPlugin from '../hyral/createVuexPlugin';

const axiosInstance = axios.create({
  baseURL: 'http://api.localhost/jsonapi',
});

const connector = createHttpConnector(
  axiosInstance,
  jsonApiTransformers.urlSerializer,
  jsonApiTransformers.paramsSerializer,
  jsonApiTransformers.requestSerializer,
  jsonApiTransformers.responseNormalizer,
);

try {
  RepositoryManager.createRepository(connector, 'faq');
  RepositoryManager.createRepository(connector, 'product');
  RepositoryManager.createRepository(connector, 'article');
} catch (e) {
  console.error(e);
}
const hyralPlugin = createVuexPlugin(RepositoryManager);
```
