# Resource definition

A resource is a simple JavaScript object. The resource is structured according to a JSON schema and defines:
* The type of resource
* The id of the resource
* The data of the resource
* The relationships of the resource

## Relations
Hyral exposes the available relations on a resource and makes the related resources available via the data attribute.

A typical resource with a relation is structured as follows:

```javascript
const resource = {
  id: 1,
  type: 'book',
  data: {
    title: 'Book title',
    author: {
      id: 21,
      type: 'author',
      data: {
        firstName: 'John',
        lastName: 'Doe',
      }
    }
  },
  relationships: {
    author: {
      cardinality: 'one-to-many',
      many: false,
      resource: 'author',
    }
  }
};
```

For a to-many relationships this would be:

```javascript
const resource = {
  id: 1,
  type: 'book',
  data: {
    title: 'Book title',
    publications: [
      {
        id: 41,
        type: 'publication',
        data: {
          year: '1966',
        },
      },
      {
        id: 42,
        type: 'publication',
        data: {
          year: '1985',
        },
      },
    ]
  },
  relationships: {
    publications: {
      cardinality: 'many-to-one',
      many: true,
      resource: 'publication',
    }
  }
};
```

### Defining relationships

The JSON API normalizer tries to guess the available relationships adn cardinality of these 
relationships. You can/should correct these guesses if they are incorrect when persisting a resource.

The following assumptions are made:
- All relations in the resource relationships property are added as relations, even if they are
  empty. 
- A relation is assumed to have a cardinality of one-to-many if the data value is an object.
- A relation is assumed to have a cardinality of many-to-many if the data value is as array.

## Creating a resource

Resources are always created via the Resource function. If you wish to create a new resource from your 
application use the Resource function to ensure a correct structure.

## JSON Schema
A JSON schema is available for a resource [here](/schema/resource.schema.json).
