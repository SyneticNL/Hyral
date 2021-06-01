import createRoute from '../../src/Helpers/createRoute';

describe('the create route helper function', () => {
  test('that the function creates a route with meta data', () => {
    const input = { path: '/path', component: {}, resolve: '/resolve' };
    const expected = { path: '/path', component: {}, meta: { resolve: '/resolve', services: ['drupal'] } };
    const route = createRoute(input);

    expect(route).toEqual(expected);
  });
});
