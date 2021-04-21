import Fallback from '../../src/Mixins/Components/Fallback';

describe('the Fallback component', () => {
  test('that it returns a renderless object', () => {
    expect(Fallback.render()).toEqual({});
  });
});
