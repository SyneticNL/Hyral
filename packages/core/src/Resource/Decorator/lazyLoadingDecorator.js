
export default function lazyLoadingDecorator(resource) {
  const dataProperty = Object.getOwnPropertyDescriptor(resource, 'data');

  Object.defineProperty(resource, 'data', {
    configurable: true,
    get() {
      return dataProperty.get();
    },
  });

  return resource;
}
