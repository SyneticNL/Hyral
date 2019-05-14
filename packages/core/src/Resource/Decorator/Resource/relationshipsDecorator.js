import isEmpty from 'lodash/isEmpty';

function relationshipsDecorator(relationships, resource) {
  const relationshipsProperty = Object.getOwnPropertyDescriptor(resource, 'relationships');

  Object.defineProperty(resource, 'relationships', Object.assign({}, relationshipsProperty, {
    configurable: true,
    get() {
      const resourceRelationships = relationshipsProperty.get();

      if (isEmpty(resourceRelationships)) {
        return relationships[resource.type] || {};
      }

      return resourceRelationships;
    },
  }));

  return resource;
}

relationshipsDecorator.create = relationships => relationshipsDecorator.bind(null, relationships);

export default relationshipsDecorator;
