# ParameterBag
All information for a request to the backend that is not a resource is contained in a parameterBag.

The parameterBag support 4 kinds of parameters:
* Filters
* Sorting
* Paging
* Params

Each is defined separately so they can be implemented by the transformers according to the backend API type.

Each type is defined in a JSDoc type. IDE's supporting this will offer autocomplete and suggestions.

## Filters

```javascript
const params = ParameterBag();

// Add a single filter.
params.addFilter({ field: 'fieldname', value: 'value' });

// Set (overwrite) filters:
params.setFilters([
  { field: 'fieldname', value: 'value' },
  { field: 'fieldname', value: 'value' }
]);
```

Value can be a string, number, boolean or null.

## Sorting

```javascript
const params = ParameterBag();

// Set (overwrite) sorting:
params.setSorting([
  {
    field: 'fieldname',
    direction: 'asc (default) or desc',
  },
  {
    field: 'fieldname',
    direction: 'asc (default) or desc',
  }
]);
```

## Paging
An object defining the paging information for the backend API in the following format:

```javascript
const params = ParameterBag();

params.setPaging({
  offset: Number,
  limit: Number,
});
```

## Params
The params type is used for any parameter that is not related to filtering, sorting or paging.

```javascript
const params = ParameterBag();

// Add a single param.
params.addParam('key', 'value');

// Set (overwrite) params:
params.setParams({
  key: 'value',
  key2: 'value2',
});
```
