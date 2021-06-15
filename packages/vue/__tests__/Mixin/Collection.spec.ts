// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import { ParameterBag, Collection } from '@hyral/core';
import collectionMixin from '../../src/Mixin/Collection';

describe('The Collection mixin', () => {
  const type = 'products';
  const name = type;
  test('that a collection is available as a computed property with a default parameterBag', () => {
    const source = { name, type };
    const context = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection(name, type)),
        },
      },
    };

    const collection = collectionMixin.computed.collection.call(context as any) as Collection<unknown>;
    expect(collection).toHaveProperty('name');
    expect(collection.name).toEqual('products');

    expect(collection.parameterBag).not.toBeNull();
  });

  test('that the collection is null when no hyralService is provided', () => {
    const source = { name, type };
    const context = {
      source,
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection(name, type)),
        },
      },
    };

    expect(collectionMixin.computed.collection.call(context as any)).toEqual(null);
    collectionMixin.methods.initCollection.call(context as any);
    expect(context.$store.getters['hyral_service/collection']).not.toHaveBeenCalled();
  });

  test('that the collection is null as a computed property without source', () => {
    const source = null;
    const mixin = {
      source,
    };
    const collection = collectionMixin.computed.collection.call(mixin as any) as Collection<unknown>;
    expect(collection).toEqual(source);
  });

  test('that a collection is initialized on created', () => {
    const source = { name, type };
    const context = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => null),
        },
        commit: jest.fn(),
      },
      initCollection: collectionMixin.methods.initCollection,
    };

    collectionMixin.created.call(context as any);
    expect(context.$store.commit).toHaveBeenCalled();
  });

  test('that a collection is not initialized without source', () => {
    const source = null;
    const context = {
      source,
      $store: { commit: jest.fn() },
    };

    collectionMixin.methods.initCollection.call(context as any);
    expect(context.$store.commit).not.toHaveBeenCalled();
  });

  test('that a collection is not initialized when already available', () => {
    const source = { name: 'products', type: 'products' };
    const context = {
      source,
      hyralService: 'service',
      $store: {
        commit: jest.fn(),
        getters: {
          'hyral_service/collection': jest.fn(() => () => ({})),
        },
      },
    };

    collectionMixin.methods.initCollection.call(context as any);
    expect(context.$store.getters['hyral_service/collection']).toHaveBeenCalled();
    expect(context.$store.commit).not.toHaveBeenCalled();
  });

  test('that the collection is initialized with the provided parameterBag', () => {
    const parameterBag = new ParameterBag();
    parameterBag.setParams({ test: 'value' });
    const source = { name, type, parameterBag };
    const context = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => new Collection(name, type)),
        },
      },
    };

    const collection = collectionMixin.computed.collection.call(context as any) as Collection<unknown>;

    expect(collection).toHaveProperty('name');
    expect(collection.parameterBag.params).toEqual(parameterBag.params);
  });

  test('that a collection will be loaded on initialization of the component', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const context = {
      source: { parameterBag: {} },
      hyralService: 'service',
      $store: {
        dispatch: jest.fn(),
      },
      loadCollection: collectionMixin.methods.loadCollection,
      collection: mockCollection,
    };
    await collectionMixin.serverPrefetch.call(context as any);
    expect(context.$store.dispatch).toHaveBeenCalled();

    context.$store.dispatch.mockClear();

    await collectionMixin.mounted.call(context as any);
    expect(context.$store.dispatch).toHaveBeenCalled();
  });

  test('that the mixin handles no source on serverPrefetch', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const context = {
      collection: null,
      hyralService: 'service',
      loadCollection: collectionMixin.methods.loadCollection,
    };

    expect.assertions(1);
    await collectionMixin.serverPrefetch.call(context as any);
    expect(mockCollection.load).not.toHaveBeenCalled();
  });

  test('that the mixin handles no source on mounted', async () => {
    const mockCollection = {
      load: jest.fn(),
    };
    const context = {
      collection: null,
      hyralService: 'service',
      loadCollection: collectionMixin.methods.loadCollection,
    };

    expect.assertions(1);
    await collectionMixin.mounted.call(context as any);
    expect(mockCollection.load).not.toHaveBeenCalled();
  });

  test('that the mixin doesn\'t load if the component does not define the name, type and parameterBag', async () => {
    const context = {
      initCollection: jest.fn(),
      loadCollection: collectionMixin.methods.loadCollection,
      collection: { load: jest.fn() },
      ...collectionMixin,
    };

    collectionMixin.created.call(context as any);
    expect(context.initCollection).toHaveBeenCalled();

    await collectionMixin.serverPrefetch.call(context as any);
    expect(context.collection.load).not.toHaveBeenCalled();

    context.collection.load.mockClear();

    await collectionMixin.mounted.call(context as any);
    expect(context.collection.load).not.toHaveBeenCalled();
  });

  test('that the collection getter can handle not being initialized yet', () => {
    const source = { name, type };
    const context = {
      source,
      hyralService: 'service',
      $store: {
        getters: {
          'hyral_service/collection': jest.fn(() => () => null),
        },
      },
    };

    expect(collectionMixin.computed.collection.call(context as any)).toBeNull();
  });
});
