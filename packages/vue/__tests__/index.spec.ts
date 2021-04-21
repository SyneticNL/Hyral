import * as vue from '../src';
import createVuexPlugin from '../src/Plugin/createVuexPlugin';
import CollectionMixin from '../src/Mixin/Collection';
import ResourceMixin from '../src/Mixin/Resource';

describe('the vue index', () => {
  test('that vue exports the correct features', () => {
    expect(vue).toEqual(expect.objectContaining({
      createVuexPlugin,
      CollectionMixin,
      ResourceMixin,
    }));
  });
});
