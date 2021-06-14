import middleware from '../../src/Middleware/Hyral';

describe('The Drupal middleware', () => {
  test('that the middleware returns when paths are matched and meta isn\'t specified', async () => {
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

    await middleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).not.toBeCalled();
      expect(mockContext.redirect).not.toBeCalled();
    });
  });

  test('that the middleware resolves', async () => {
    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve()),
      },
      route: {
        path: '/home',
        matched: [{ path: '/home', meta: { services: ['drupal'], resolve: '/page/home' } }],
      },
      redirect: jest.fn(),
    };

    await middleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).toHaveBeenCalled();
      expect(mockContext.store.dispatch).toHaveBeenCalledWith('druxtRouter/get', '/page/home');
    });
  });

  test('that the middleware resolves to path without resolve', async () => {
    const mockContext = {
      store: {
        dispatch: jest.fn(() => Promise.resolve()),
      },
      route: {
        path: '/home',
        matched: [{ path: '/home', meta: { services: ['drupal'] } }],
      },
      redirect: jest.fn(),
    };

    await middleware(mockContext as any).then(() => {
      expect(mockContext.store.dispatch).toHaveBeenCalled();
      expect(mockContext.store.dispatch).toHaveBeenCalledWith('druxtRouter/get', '/home');
    });
  });
});
