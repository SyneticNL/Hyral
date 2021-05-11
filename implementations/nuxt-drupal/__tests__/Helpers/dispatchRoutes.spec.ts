import dispatchRoutes from '../../src/Helpers/dispatchRoutes';

describe('the dispatchRoutes component function', () => {
  test('that the function doesn\'t dispatch to the store with an empty list', async () => {
    const mockStore = {
      $store: {
        dispatch: jest.fn(),
      },
    };

    await dispatchRoutes.call(mockStore, []);

    expect(mockStore.$store.dispatch).not.toHaveBeenCalled();
  });

  test('that the function dispatches to the store for each url', async () => {
    const list = ['url1', 'url2', 'url3'];
    const mockStore = {
      $store: {
        dispatch: jest.fn(() => Promise.resolve({})),
      },
    };

    const expectedResult = list.map((url) => ({ url, route: {} }));
    const result = await dispatchRoutes.call(mockStore, list);

    expect(mockStore.$store.dispatch).toHaveBeenCalledTimes(3);
    expect(result).toEqual(expectedResult);
  });

  test('that the function throws an error when the promise rejects', async () => {
    const list = ['url1'];
    const routerError = { error: 'error' };
    const mockStore = {
      $store: {
        dispatch: jest.fn(() => Promise.resolve(routerError)),
      },
    };

    await dispatchRoutes.call(mockStore, list).catch((err) => {
      expect(err).toEqual(routerError.error);
    });

    expect(mockStore.$store.dispatch).toHaveBeenCalled();
  });
});
