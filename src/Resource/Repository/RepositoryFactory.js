
export default function createRepository(manager, repositoryDefinition, connector, resourceType, identifier) {
  const repository = Object.create(repositoryDefinition, {
    connector: {
      writable: false,
      enumerable: false,
      value: connector,
    },
    resourceType: {
      writable: false,
      enumerable: false,
      value: resourceType,
    },
    identifier: {
      writable: false,
      enumerable: false,
      value: identifier,
    },
  });

  manager.addRepository(repository);

  return repository;
}
