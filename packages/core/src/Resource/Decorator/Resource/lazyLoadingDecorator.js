import repositoryManager from '../../repositoryManager';
import { setState } from '../../../State/State';

export default function lazyLoadingDecorator(resource) {
  const dataProperty = Object.getOwnPropertyDescriptor(resource, 'data');

  Object.defineProperties(resource, {
    load: {
      value() {
        resource.setMetadata({ loaded: false, loading: true });

        const repository = repositoryManager.getRepository(resource.type);
        if (!repository) {
          throw new Error(`Failed lazy loading ${resource.type} because repository is missing`);
        }

        return repository.findById(resource.id)
          .then((loadedResource) => {
            setState(resource.stateStack, loadedResource.state);
            resource.setMetadata({ loaded: true, loading: false });
          })
          .catch(() => {
            resource.setMetadata({ loaded: false, loading: false });
            throw new Error(`Failed lazy loading ${resource.type} for ${resource.id}`);
          });
      },
    },
    data: Object.assign({}, dataProperty, {
      configurable: true,
      get() {
        if (resource.metadata.loaded || resource.id === null) {
          return dataProperty.get();
        }

        resource.load();

        return dataProperty.get();
      },
    }),
  });

  return resource;
}
