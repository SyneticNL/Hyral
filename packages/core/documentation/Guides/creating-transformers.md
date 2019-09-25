# Creating your own transformer
You will only need to make a transformer if you want to use a backend API type that is not supported by Hyral or 
any other additional package. Currently Hyral only ships with JSON:API backend support.

**Note: If you only fetch resources from your api you will not need to create a `requestSerializer`.**

*Example*
This guide will provide examples for each part of the transformer based on the following API backend:

* GET `/products`

Will return a list of products:
```
[
  {
    id: "1",
    title: "product 1",
  },
  {
    id: "2",
    title: "product 2",
  }
]
```

You can search by adding `?title=value`.
Sorting is done via `sort=[field]&dir=[direction]`.

* GET `products/[id]`

Will return a product:
```
{
  id: "1",
  title: "product 1",
}
```

* POST `products`

Will create a new product.

* PATCH `products/[id]`

Will update an existing product.

## Implementing a paramsSerializer
The paramsSerializer will receive a `ParameterBag` instance (can be null/undefined) and will need to return a format
the Connector can use. In case of the HttpConnector this will be a query-string.

### Example
```
// https://www.npmjs.com/package/qs
import stringify from 'qs/lib/stringify';

function paramsSerializer(parameterBag) {
  const filters = {};
  parameterBag.filters.forEach((filter) => {
    filters[filter.field] = filter.value;
  });

  const sorting = {};
  if (parameterBag.sorting.length > 0) {
     sorting.sort = parameterBag.sorting[0].field;
     sorting.dir = sort.direction;
  }

  return stringify({
    ...filters,
    ...sorting,
  });
}
```

## Implementing an urlSerializer
The urlSerializer is a simple object that needs to defined the following methods with the following parameters: 

* `fetch(repository)`
* `fetchOne(repository, id)`
* `create(resourceType)`
* `update(resourceType, id)`
* `delete(resourceType, id)`
* `relation(resourceType, id, relation)`

Each method will need to return a format the Connector can use. In case of the HttpConnector this will be a 
string (uri).

### Example
```
const urlSerializer = {
  fetch(repository) {
    return `/${repository.resourceType}`;
  },
  fetchOne(repository, id) {
    return `/${repository.resourceType}/${id}`;
  },
  create(resourceType) {
    return `/${repository.resourceType}`;                      
  },
  update(resourceType, id) {
    return `/${repository.resourceType}/${id}`;                          
  },
  delete(resourceType, id) {
    return '';
  },
  relation(resourceType, id, relation) {
    return '';
  },
};
```

## Implementing a responseNormalizer
The response normalizer converts the backend response format into the Hyral format.

The response normalizer is a function that will receive the following arguments:
```
function(response.data, response.headers, repository)
```

It should result in an object:

```javascript
{
  data: [] || {},
  paging: {
    count: 0,
    pages: 0,
  },
}
```

The `data` property will be an array when normalizing multiple resources. It will be an object when normalizing a
single resource.
The paging property must be filled when returning multiple resources. `count` contains the number of resources (regardless
of paging) and `pages` contains the number of pages the results are split into.

### Example
```
function normalizeResources(items, repository) {
  return items.map(item => Resource.create(
    item.id,
    repository.resourceType,
    item,
  ));
}

function responseNormalizer(response, headers, repository) {
  if (!response.data) {
    return response;
  }

  const singleMode = !Array.isArray(response.data);

  const rootResources = normalizeResources(singleMode ? [response.data] : response.data, repository);

  if (singleMode) {
    return {
      data: rootResources.shift(),
    };
  }

  return {
    data: rootResources,
    paging: {},
  };
}
```

## Implementing a requestSerializer
A request serializer converts tasks into a payload the server understands. A task is of the type:

* `create` - A new resource
* `update` - An updated resource
* `relation` - An updated relation on a resource (new or updated)


### Example
```

// Should return the body of the request to the backend, in this case simply the data object. 
function serializeCreateUpdateTask(task) {
  if (!isTask(task)) {
    return task;
  }

  if (task.type !== 'create' && task.type !== 'update') {
    return task;
  }

  return task.payload.data;
}

// Not for the example API. Implement this if there is a URL for updating relationships on a resource.
function serializeRelationTask(task) {
  return task;
}

function requestSerializer(data) {
  const serializers = [
    serializeCreateUpdateTask,
    serializeRelationTask,
  ];

  return serializers.reduce((result, serializer) => serializer(result), data);
}
```
