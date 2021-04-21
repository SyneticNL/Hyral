import drupalMiddleware from '../../src/Middleware/DrupalMiddleware';

describe('The Drupal middleware', () => {
  test('that the middleware returns when paths are matched and prop isnt specified', async () => {
    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve()),
      },
      route: {
        path: '/home',
        matched: [{}],
      },
      redirect: jest.fn(),
    };

    await drupalMiddleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).not.toBeCalled();
      expect(mockContext.redirect).not.toBeCalled();
    });
  });

  test('that the middleware returns when a statusCode is returned from the dispatch', async () => {
    const mockDruxtRouterResponse = {
      statusCode: 500,
    };

    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve(mockDruxtRouterResponse)),
      },
      route: {
        path: '/home',
        matched: [{ path: '/home', props: { default: { drupal: true } } }],
      },
      redirect: jest.fn(),
    };

    await drupalMiddleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).toBeCalled();
      expect(mockContext.redirect).not.toBeCalled();
    });
  });

  test('that the middleware returns when the path matches the resolvedPath', async () => {
    const mockDruxtRouterResponse = {
      route: {
        resolvedPath: '/home',
      },
    };

    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve(mockDruxtRouterResponse)),
      },
      route: {
        path: '/home',
        matched: [{ path: '/home', props: { default: { drupal: true } } }],
      },
      redirect: jest.fn(),
    };

    await drupalMiddleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).toBeCalled();
      expect(mockContext.redirect).not.toBeCalled();
    });
  });

  test('that the middleware redirects when the path does not match the resolvedPath', async () => {
    const mockDruxtRouterResponse = {
      route: {
        resolvedPath: '/redirect/home',
      },
    };

    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve(mockDruxtRouterResponse)),
      },
      route: {
        path: '/home',
        matched: [{ path: '/home', props: { default: { drupal: true } } }],
      },
      redirect: jest.fn(),
    };

    await drupalMiddleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).toBeCalled();
      expect(mockContext.redirect).toHaveBeenCalled();
      expect(mockContext.redirect).toBeCalledWith('/redirect/home');
    });
  });
});
