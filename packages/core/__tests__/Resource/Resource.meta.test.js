import Resource from '../../src/Resource/Resource';

describe('The Resource meta', () => {
  test('that the meta object is correctly available', () => {
    const resource1 = Resource.create(1, 'product', { title: 'test' }, null, { test: 'meta' });

    expect(resource1.meta).toEqual({ test: 'meta' });

    const resource2 = Resource.create(1, 'product', { title: 'test' });
    expect(resource2.meta).toEqual({});

  });

  test('that the meta object is writable', () => {
    const resource1 = Resource.create(1, 'product', { title: 'test' }, null, { test: 'meta' });
    resource1.meta = { test: 'test' };

    expect(resource1.meta).toEqual({ test: 'test' });
  });

  test('that the meta object remains available after creating from state', () => {
    const resource1 = Resource.create(1, 'product', { title: 'test' }, null, { test: 'meta' });

    const resource2 = Resource.fromState(1, 'product', resource1.state);

    expect(resource2.meta).toEqual({ test: 'meta' });
  });
});
