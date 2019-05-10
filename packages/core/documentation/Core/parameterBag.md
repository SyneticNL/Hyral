# ParameterBag
All information for a request to the backend that is not a resource is contained in a parameterBag.

The parameterBag support 4 kinds of parameters:
* Filters
* Sorting
* Paging
* Params

Each is defined separately so they can be implemented by the transformers accoding to the backend API type.

Each type is defined in a JSDoc type. IDE's supporting this will offer autocomplete and suggestions.

## Filters
An array of filters in the format:

```javascript
[
  {
    field: 'fieldname',
    value: 'value',
  }
]
```

Value can be a string, number, boolean or null.

## Sorting
An array of sorting information in the following format:

```javascript
[
  {
    field: 'fieldname',
    direction: 'asc (default) or desc',
  }
]
```

## Paging
An object defining the paging information for the backend API in the following format:

```javascript
{
  offset: Number,
  limit: Number,
}
```

## Params
The params type is used for any parameter that is not related to filtering, sorting or paging.

```javascript
{
  key: 'value',
}
```
