# Relationships

Resources can be related to other resources. Hyral exposes the available relations on a resource and makes the related
resources available via the data attribute.

A typical resource with a relation is structured as follows:

## Relationship format

A relationships is defined with:
* A `key` (author) under which it will be available in data.
* The `cardinality` of the relationships
* The `many` attribute defines if the relationship contains multiple resources.
* The `resource` defines the type of the related resource.

```javascript
const relationships = {
  author: {
    cardinality: 'one-to-many',
    many: false,
    resource: 'author',
  }
};
```

## Defining relationships

You can define relationships via the Resource.create factory for each resource manually or use the `relationshipDecorator` Resource decorator.

### Relationship decorator

Hyral ships with the relationshipsDecorator to make it easy to define the relationships for all resources in 1 place.

#### Usage
```javascript
import Resource from '@hyral/core/lib/Resource/Resource';
import createRelationshipsDecorator from '@hyral/core/lib/Resource/Decorator/Resource/relationshipsDecorator';

Resource.decorators.push(createRelationshipsDecorator({
  product: {
    price: {
      cardinality: 'one-to-one',
      many: false,
      resource: 'price',
    },
    author: {
      cardinality: 'one-to-one',
      many: false,
      resource: 'people',
    },
  },
  book: {
    author: {
      cardinality: 'one-to-one',
      many: false,
      resource: 'people',
    },
  },
}));
```

Include for each resource type a key with the relationship definitions.

As long as you don't pass a relationship definition when creating a Resource the definition passed to the
createRelationshipsDecorator factory.

### Manual definition
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
      cardinality: 'one-to-many',
      many: true,
      resource: 'publication',
    }
  }
};
```

#### Relationships carnality's

The following types of carnality's are supported:

- `one-to-one`: One instance of the current Entity refers to One instance of the refered Entity.
- `one-to-many`: One instance of the current Entity has Many instances (references) to the refered Entity.
- `many-to-one`: Many instances of the current Entity refer to One instance of the refered Entity.
- `many-to-many`: Many instances of the current Entity have Many instances (references) to the refered Entity.
