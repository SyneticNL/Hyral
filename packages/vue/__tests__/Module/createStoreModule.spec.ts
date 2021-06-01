import {
  Resource,
  Collection,
  ParameterBag,
  IRepository,
  IResource,
} from '@hyral/core';
import Vue from 'vue';
import Vuex from 'vuex';
import createStoreModule from '../../src/Module/createStoreModule';
import { IResourcePayload, ICollectionPayload } from '../../src/__types__';

describe('The createStoreModule', () => {
  test('that a store module is created with the required methods', () => {
    const module = createStoreModule({} as Record<string, IRepository<any>>);

    expect(module).toHaveProperty('namespaced');
    expect(module).toHaveProperty('state');
    expect(module.state).toHaveProperty('resources');
    expect(module.state).toHaveProperty('collections');
    expect(module).toHaveProperty('mutations');
    expect(module.mutations).toHaveProperty('SET_COLLECTION');
    expect(module.mutations).toHaveProperty('SET_RESOURCE');
    expect(module).toHaveProperty('actions');
    expect(module.actions).toHaveProperty('LOAD_RESOURCE');
    expect(module.actions).toHaveProperty('LOAD_COLLECTION');
  });

  test('that it is possible to get a resource from the store', () => {
    const product = new Resource(1, 'product', { title: 'A great product' });

    const state = {
      resources: {
        product: { 1: product },
      },
    };

    const repositories = { product: { resourceType: 'product' } as IRepository<any> };

    const module = createStoreModule(repositories);

    type MockGetters = {
      resource: (state: unknown) => (type: string) => (id: unknown) => IResource<Record<string, unknown>>
    };

    const getters = module.getters as MockGetters;
    const getter = getters.resource(state);

    const foundProduct = getter('product')(1);
    const foundProduct2 = getter('product')(2);

    expect(foundProduct.id).toEqual(product.id);
    expect(foundProduct.data.title).toEqual(product.data.title);
    expect(foundProduct2).toBeNull();
  });

  test('that it is possible to get a collection from the store', () => {
    const name = 'products';
    const resourceType = 'items';
    const repository = { resourceType } as IRepository<any>;
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;
    const module = createStoreModule(repositories);

    const products = new Collection(name, repository);
    const state = { collections: {} as Record<string, any> };
    state.collections[resourceType] = { products };

    type MockGetters = {
      collection: (state: unknown) => (type: string) => (name: string) => Collection<Record<string, unknown>>
    };

    const getters = module.getters as MockGetters;
    const getter = getters.collection(state);

    const foundProducts = getter(resourceType)(name);
    const foundNonExistingCollection = getter(resourceType)('non-existingcollection');

    expect(foundProducts.name).toEqual(products.name);
    expect(foundProducts.repository).toBe(repository);

    expect(foundNonExistingCollection).toBeNull();
  });

  test('that it is possible to mutate a collection in the store', () => {
    const name = 'products';
    const resourceType = 'items';
    const repository = { resourceType } as IRepository<any>;
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const products = new Collection(name, repository);

    const state = { collections: {} as Record<string, Record<string, any>> };
    state.collections[resourceType] = {};
    const module = createStoreModule(repositories);
    module.mutations?.SET_COLLECTION(state as any, { name, resourceType, collection: products });

    expect(state.collections).toHaveProperty(resourceType);
    expect(state.collections.items.products).toEqual(products);
  });

  test('that it is possible to mutate a resource in the store', () => {
    const identifier = '1';
    const resourceType = 'items';
    const repository = { resourceType, identifier } as IRepository<any>;
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const product = new Resource(identifier, resourceType, { title: 'A great product' });

    const state = { resources: { items: {} } as Record<string, Record<string, any>> };
    const module = createStoreModule(repositories);
    module.mutations?.SET_RESOURCE(state as any, product);

    const { resources } = state;
    expect(resources).toHaveProperty(resourceType);
    expect(resources[resourceType]).toHaveProperty(identifier);
    expect(resources[resourceType][identifier]).toEqual(product);
  });

  test('that it is possible to load the results for a collection in the store', () => {
    const name = 'products';
    const resourceType = 'items';
    const repository = { resourceType, find: jest.fn() };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const products = new Collection(name, repository as any);
    products.load = jest.fn();

    const module = createStoreModule(repositories);
    module.state = { collections: {}, resources: {} };
    module.state.collections[resourceType] = { products };

    type Mockactions = { LOAD_COLLECTION: (a: unknown, b: ICollectionPayload) => any };
    const actions = module.actions as Mockactions;
    actions.LOAD_COLLECTION(
      { getters: { collection: jest.fn(() => () => products) }, state: module.state, commit: jest.fn() },
      { resourceType, name },
    );

    expect(repository.find).toHaveBeenCalled();
  });

  test('that the collection is initialized on first action', async () => {
    const name = 'products';
    const resourceType = 'items';
    const repository = { resourceType, find: jest.fn() };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const module = createStoreModule(repositories);
    module.state = { collections: {}, resources: {} };

    type Mockactions = { LOAD_COLLECTION: (a: any, b: ICollectionPayload) => any };
    const commit = jest.fn();
    const actions = module.actions as Mockactions;
    await actions.LOAD_COLLECTION(
      { commit },
      { resourceType, name },
    );

    expect(commit).toHaveBeenCalled();
  });

  test('that it is possible to get a non existing resource in the store', async () => {
    const identifier = '1';
    const resourceType = 'items';
    const product = new Resource(identifier, resourceType, { title: 'A great product' });

    const repository = {
      resourceType,
      findById: jest.fn(() => Promise.resolve(product)),
    };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const module = createStoreModule(repositories);
    const mockModule = { state: { resources: { items: {} } }, commit: jest.fn() };
    type MockActions = { LOAD_RESOURCE: (a: unknown, b: IResourcePayload) => Promise<any> };
    const actions = module.actions as MockActions;

    await actions.LOAD_RESOURCE(mockModule, { resourceType, id: identifier });
    expect(repository.findById).toHaveBeenCalledWith(identifier, undefined);
    expect(mockModule.commit).toHaveBeenCalledWith('SET_RESOURCE', product);
  });

  test('that the store returns when accesssing a non existing resourceType', async () => {
    const identifier = '1';
    const resourceType = 'items';
    const product = new Resource(identifier, resourceType, { title: 'A great product' });

    const repository = {
      resourceType,
      findById: jest.fn(() => Promise.resolve(product)),
    };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const module = createStoreModule(repositories);
    const mockModule = { state: { resources: {} }, commit: jest.fn() };
    type MockActions = { LOAD_RESOURCE: (a: unknown, b: IResourcePayload) => Promise<any> };
    const actions = module.actions as MockActions;

    await actions.LOAD_RESOURCE(mockModule, { resourceType, id: identifier });
    expect(repository.findById).not.toHaveBeenCalled();
  });

  test('that it is possible to set a resource with a paramaterbag in the store', async () => {
    const identifier = 2;
    const resourceType = 'product';
    const product = new Resource(identifier, resourceType, { title: 'A great product' });
    const parameterBag = new ParameterBag();
    parameterBag.addParam('include', 'relation1,relation2');

    const repository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const module = createStoreModule(repositories);
    const mockModule = { state: { resources: { product: {} } }, commit: jest.fn() };
    type MockActions = { LOAD_RESOURCE: (a: unknown, b: IResourcePayload) => Promise<any> };
    const actions = module.actions as MockActions;

    await actions.LOAD_RESOURCE(mockModule, { id: identifier, resourceType, parameterBag });
    expect(repository.findById).toHaveBeenCalledWith(identifier, parameterBag);
    expect(repository.findById).toHaveBeenCalledTimes(1);
    expect(mockModule.commit).toHaveBeenCalledTimes(1);
    expect(mockModule.commit).toHaveBeenCalledWith('SET_RESOURCE', product);
  });

  test('that it is possible to cache an existing resource in the store', async () => {
    const identifier = '1';
    const resourceType = 'product';
    const product = new Resource(identifier, resourceType, { title: 'A great product' });

    const repository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    const module = createStoreModule(repositories);
    const mockModule = { state: { resources: { product: { 1: product } } }, commit: jest.fn() };
    type MockActions = { LOAD_RESOURCE: (a: unknown, b: IResourcePayload) => Promise<any> };
    const actions = module.actions as MockActions;

    await actions.LOAD_RESOURCE(mockModule, { id: identifier, resourceType });
    expect(repository.findById).toHaveBeenCalledTimes(0);
    expect(mockModule.commit).toHaveBeenCalledTimes(0);
  });

  test('that the Vuex store is correctly initialized', () => {
    const identifier = '1';
    const resourceType = 'product';
    const product = new Resource(identifier, resourceType, { title: 'A great product' });

    const repository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };
    const repositories = {} as Record<string, any>;
    repositories[repository.resourceType] = repository;

    Vue.use(Vuex);
    const store = new Vuex.Store({});

    store.registerModule('hyral', createStoreModule(repositories));

    store.commit('hyral/SET_RESOURCE', product);

    type MockGetters = { 'hyral/resource': (type: string) => (id: string) => IResource<Record<string, unknown>> };
    const getters = store.getters as MockGetters;
    const storeProduct = getters['hyral/resource'](resourceType)(identifier);
    expect(storeProduct.data.title).toEqual(product.data.title);
  });
});
