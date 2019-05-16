import Resource from '@hyral/core/lib/Resource/Resource';
import createVuexCollectionFromState
  from '../../src/Collection/createVuexCollectionFromState';
import ParameterBag from '@hyral/core/src/Resource/ParameterBag';

describe('The createVuexCollectionFromState', () => {
  test('that a collection load will call a commit on the store if created via createVuexCollectionFromState', () => {
    const product = Resource.create(1, 'product', { title: 'A great product' });
    const name = 'test';
    const state = {};
    const repository = {
      resourceType: 'product',
      find: jest.fn(() => Promise.resolve({
        data: [
          product,
        ],
      })),
    };

    const store = {
      commit: jest.fn(),
    };

    const collection = createVuexCollectionFromState(name, state, repository, store);

    expect(collection.name).toEqual(name);

    return collection.load().then(() => {
      expect(store.commit).toHaveBeenCalledTimes(2);
      expect(store.commit).toHaveBeenCalledWith('hyral_product/SET_COLLECTION', {
        name: collection.name,
        state: collection.state,
      });
      expect(store.commit).toHaveBeenCalledWith('hyral_product/SET_RESOURCE', product);
    });
  });

  test('that a collection parameterBag set will updated the parameterBag and trigger a commit', () => {
    const name = 'test';
    const state = {};

    const store = {
      commit: jest.fn(),
    };

    const collection = createVuexCollectionFromState(name, state, {}, store);

    const parameterBag = ParameterBag();
    parameterBag.setParams({ test: 'value' });

    collection.parameterBag = parameterBag;

    expect(store.commit).toHaveBeenCalled();
    expect(collection.parameterBag.params).toEqual(parameterBag.params);
  });
});
