import createRoute from '../../src/Helpers/createRoute';

describe('the create route helper function', () => {
  test('that the function creates a route with meta data', () => {
    const input = { path: '/path', component: {}, resolve: '/resolve' };
    const expected = { path: '/path', component: {}, meta: { resolve: '/resolve', services: ['drupal'] } };
    const route = createRoute(input);

    expect(route).toEqual(expected);
  });

  test('that the function carries over all attributes automatically', () => {
    const input = {
      path: '/path',
      component: {},
      name: 'path',
      components: { comp: {} },
      redirect: '/redirect',
      props: true,
      alias: '/route',
      children: [],
      beforeEnter: () => {},
      meta: {
        test: 'test',
        services: ['anotherservice'],
      },
      caseSensitive: false,
      pathToRegexpOptions: {},
      resolve: '/resolve',
    };

    const route = createRoute(input as any);
    const expectedKeys = Object.keys((({ resolve, ...otherProps }) => otherProps)(input));

    expectedKeys.forEach((key) => expect(route).toHaveProperty(key));
    expect(route.meta).toEqual({ test: 'test', resolve: '/resolve', services: ['anotherservice', 'drupal'] });
  });
});
