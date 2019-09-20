# Creating your own transformer
You will only need to make a transformer if you want to use a backend API type that is not supported by Hyral or 
any other additional package. Currently Hyral only ships with JSON:API backend support.

*Note: If you only fetch resources from your api you will not need to create a `requestSerializer`.*

## Implementing a paramsSerializer
The paramsSerializer will receive a `ParameterBag` instance (can be null/undefined) and will need to return a format
the Connector can use. In case of the HttpConnector this will be a query-string.

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

## Implementing a requestSerializer
A request serializer converts tasks into a payload the server understands. A task is of the type:

* `create` - A new resource
* `update` - An updated resource
* `relation` - An updated relation on a resource (new or updated)
