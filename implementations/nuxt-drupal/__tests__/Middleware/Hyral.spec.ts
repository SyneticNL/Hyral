import middleware, { createResolve } from '../../src/Middleware/Hyral';

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

describe('the createResolve function', () => {
  test('that the function returns path without resolve', () => {
    expect(createResolve('/path')).toEqual('/path');
  });
  test('that the function returns resolve without wildcards', () => {
    expect(createResolve('/path', '/resolve')).toEqual('/resolve');
  });
  test('that the function throws an error when only resolve has a wildcard', () => {
    expect.assertions(1);
    expect(() => createResolve('/path', '/:wildcard')).toThrowError('Both resolve and match need wildcards');
  });
  test('that the function returns the correct output', () => {
    expect(createResolve('/prefix/path', '/:wildcard', '/prefix/:id')).toEqual('/path');
    expect(createResolve('/path/postfix', '/:wildcard', '/:id/postfix')).toEqual('/path');
    expect(createResolve('/path', '/prefix/:wildcard', '/:id')).toEqual('/prefix/path');
    expect(createResolve('/path', '/:wildcard/postfix', '/:id')).toEqual('/path/postfix');
  });
});
