# Resource definition

A resource is a simple JavaScript object. The resource is structured according to a JSON schema and defines:
* The type of resource
* The id of the resource
* The data of the resource
* The metadata of the resource containing:
  * The available relationships for the resouce

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
  metadata: {
    relationships: {
      author: {
        isMany: false,
        type: 'author',
      }
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
  metadata: {
    relationships: {
      publications: {
        isMany: true,
        type: 'publication',
      }
    }
  }
};
```

## Factory

Resources are always created via the resourceFactory function. If you wish to create a new resource from your 
application use the resourceFactory method to ensure a correct structure.

## JSON Schema
A JSON schema is available for a resource [here](/schema/resource.schema.json).
