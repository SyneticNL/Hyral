import Resource from '../../src/Resource/Resource';

describe('The Resource meta', () => {
  test('that the meta object is correctly available', () => {
    const resource1 = new Resource(1, 'product', { title: 'test' }, undefined, { test: 'meta' });

    expect(resource1.meta).toEqual({ test: 'meta' });

    const resource2 = new Resource(1, 'product', { title: 'test' });
    expect(resource2.meta).toEqual(undefined);
  });

  test('that the meta object is writable', () => {
    const resource1 = new Resource(1, 'product', { title: 'test' }, undefined, { test: 'meta' });
    resource1.meta = { test: 'test' };

    expect(resource1.meta).toEqual({ test: 'test' });
  });
});
