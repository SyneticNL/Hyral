import repositoryManager from '../../repositoryManager';
import { setState } from '../../../State/State';

export default function lazyLoadingDecorator(resource) {
  const dataProperty = Object.getOwnPropertyDescriptor(resource, 'data');

  Object.defineProperty(resource, 'data', Object.assign({}, dataProperty, {
    configurable: true,
    get() {
      if (resource.metadata.loaded || resource.id === null) {
        return dataProperty.get();
      }

      const repository = repositoryManager.getRepository(resource.type);

      resource.setMetadata({ loaded: false, loading: true });

      repository.findById(resource.id)
        .then((loadedResource) => {
          setState(resource.stateStack, loadedResource.state);
          resource.setMetadata({ loaded: true, loading: false });
        });

      return dataProperty.get();
    },
  }));

  return resource;
}
