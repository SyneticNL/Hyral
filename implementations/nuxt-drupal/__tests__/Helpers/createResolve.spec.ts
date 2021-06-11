import createResolve from '../../src/Helpers/createResolve';

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
