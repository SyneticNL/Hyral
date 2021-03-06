import Vue from 'vue';
import Vuex from 'vuex';
import createStoreModule from '../../src/Module/createStoreModule';
import Resource from '../../../core/src/Resource/Resource';
import Collection from '../../../core/src/Resource/Collection';
import ParameterBag from '@hyral/core/src/Resource/ParameterBag';

describe('The createStoreModule', () => {
  test('that a store module is created with the required methods', () => {

    const module = createStoreModule({}, {});

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
    const product = Resource.create(1, 'product', { title: 'A great product' });

    const state = {
      resources: {
        1: product.state,
      },
    };

    const module = createStoreModule({
      resourceType: 'product',
    });

    const getter = module.getters.resource(state);

    const foundProduct = getter(1);
    const foundProduct2 = getter(2);

    expect(foundProduct.id).toEqual(product.id);
    expect(foundProduct.data.title).toEqual(product.data.title);
    expect(foundProduct2).toBeNull();
  });

  test('that it is possible to get a collection from the store', () => {
    const mockRepository = {
      resourceType: 'product',
    };

    const module = createStoreModule(mockRepository, {
      commit: jest.fn(),
    });

    const products = Collection.create('products', mockRepository);

    const getter = module.getters.collection({
      collections: {
        products,
      },
    });

    const foundProducts = getter('products');
    const foundNonExistingCollection = getter('non-existingcollection');

    expect(foundProducts.name).toEqual(products.name);
    expect(foundProducts.repository).toBe(mockRepository);

    expect(foundNonExistingCollection).toBeNull();
  });

  test('that it is possible to mutate a collection in the store', () => {
    const mockRepository = {
      resourceType: 'product',
    };

    const module = createStoreModule(mockRepository, {});

    const products = Collection.create('products', mockRepository);

    const state = {
      collections: {},
    };

    module.mutations.SET_COLLECTION(state, products);

    expect(state.collections).toHaveProperty('products');
    expect(state.collections.products).toBe(products.state);
  });

  test('that it is possible to mutate a resource in the store', () => {
    const mockRepository = {
      resourceType: 'product',
      identifier: 'id',
    };

    const module = createStoreModule(mockRepository, {});

    const product = Resource.create('1', 'product', { title: 'A great product' });

    const state = {
      resources: {},
    };

    module.mutations.SET_RESOURCE(state, product);

    expect(state.resources).toHaveProperty('1');
    expect(state.resources['1']).toEqual(product.state);
  });

  test('that it is possible to load the results for a collection in the store', () => {
    const mockRepository = {
      resourceType: 'product',
    };

    const module = createStoreModule(mockRepository, {
      commit: jest.fn(),
    });

    const products = Collection.create('products', mockRepository);
    products.load = jest.fn();

    module.state = {
      collections: {
        products,
      },
    };

    module.actions.LOAD_COLLECTION(
      { getters: { collection: jest.fn(() => products) } },
      'products',
    );

    expect(products.load).toHaveBeenCalled();
  });

  test('that it is possible to get a non existing resource in the store', () => {
    const product = Resource.create('1', 'product', { title: 'A great product' });

    const mockRepository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };

    const module = createStoreModule(mockRepository, {
      commit: jest.fn(),
    });

    const mockModule = { state: { resources: {} }, commit: jest.fn() };
    return module.actions.LOAD_RESOURCE(mockModule, '1').then(() => {
      expect(mockRepository.findById).toHaveBeenCalledWith('1', null);
      expect(mockModule.commit).toHaveBeenCalledWith('SET_RESOURCE', product);
    });
  });

  test('that it is possible to set a resource with a paramaterbag in the store', () => {
    const product = Resource.create(2, 'product', { title: 'A great product' });
    const parameterBag = ParameterBag();
    parameterBag.addParam('include', 'relation1,relation2');

    const mockRepository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };

    const module = createStoreModule(mockRepository, {
      commit: jest.fn(),
    });
    const mockModule = { state: { resources: {} }, commit: jest.fn() };

    return module.actions.LOAD_RESOURCE(mockModule, '1', parameterBag).then(() => {
      expect(mockRepository.findById).toHaveBeenCalledWith('1', parameterBag);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockModule.commit).toHaveBeenCalledTimes(2);
      expect(mockModule.commit).toHaveBeenCalledWith('SET_RESOURCE', product);
    });
  });

  test('that it is possible to an existing resource in the store', () => {
    const product = Resource.create('1', 'product', { title: 'A great product' });

    const mockRepository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };

    const module = createStoreModule(mockRepository, {
      commit: jest.fn(),
    });

    const mockModule = { state: { resources: { 1: product.state } }, commit: jest.fn() };
    return module.actions.LOAD_RESOURCE(mockModule, '1').then(() => {
      expect(mockRepository.findById).toHaveBeenCalledWith('1', null);
      expect(mockModule.commit).toHaveBeenCalledTimes(1);
      expect(mockModule.commit).toHaveBeenCalledWith('SET_RESOURCE', product);
    });

  });

  test('that the Vuex store is correctly initialized', () => {
    const product = Resource.create('1', 'product', { title: 'A great product' });

    const mockRepository = {
      resourceType: 'product',
      findById: jest.fn(() => Promise.resolve(product)),
    };

    Vue.use(Vuex);
    const store = new Vuex.Store({});

    store.registerModule('product', createStoreModule(mockRepository, store));

    store.commit('product/SET_RESOURCE', product);

    const storeProduct = store.getters['product/resource']('1');
    expect(storeProduct.data.title).toEqual(product.data.title);
  });
});
