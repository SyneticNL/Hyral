// We have to asume Vue binds mixin methods to 'this'
/* eslint-disable @typescript-eslint/unbound-method */
import drupalMixin from '../../src/Mixins/DrupalMixin';
import Fallback from '../../src/Mixins/Components/Fallback';

describe('The Drupal mixin', () => {
  const defaultStoreDruxtRouter = {
    state: {
      druxtRouter: {
        route: {
          props: {
            uuid: 'druxtRouterTestId',
            type: 'druxtRouterTestProduct',
          },
        },
      },
    },
  };

  test('that the mixin is correctly initialized', () => {
    const mixin = {
      computed: {
        mapping: jest.fn(() => ({ test: 'test' })),
      },
      ...drupalMixin,
    };

    const mapping = mixin.computed.mapping.call(mixin) as Record<string, any>;

    expect(mapping).toHaveProperty('test');
    expect(mapping.test).toEqual('test');

    expect(mixin.methods).toHaveProperty('getEntity');
    expect(drupalMixin).toHaveProperty('mixins');
  });

  test('that the data is correctly loaded with drupal props', () => {
    const mixin = {
      uuid: '12345',
      type: 'product',
      $store: defaultStoreDruxtRouter,
      ...drupalMixin,
    };

    expect(mixin.data()).toEqual({ id: '12345', resourceType: 'product', hyralService: 'drupal' });
  });

  test('that the data is correctly loaded with druxtRouter state', () => {
    const mixin = {
      $store: defaultStoreDruxtRouter,
      ...drupalMixin,
    };

    expect(mixin.data()).toEqual({
      id: defaultStoreDruxtRouter.state.druxtRouter.route.props.uuid,
      resourceType: defaultStoreDruxtRouter.state.druxtRouter.route.props.type,
      hyralService: 'drupal',
    });
  });

  test('that getEntity method throws an error without any mapping present', () => {
    const mixin = {
      getEntity: drupalMixin.methods.getEntity,
    };
    expect(() => mixin.getEntity('test')).toThrow('No computed mapping found');
  });

  test('that getEntity method returns the fallback component if the requested component is not found', () => {
    const mixin = {
      mapping: {},
      getEntity: drupalMixin.methods.getEntity,
    };

    expect(mixin.getEntity('doesnotexist')).toBe(Fallback);
  });

  test('that getEntity method returns if requested component is not found and a fallback component is provided', () => {
    const mixin = {
      mapping: { fallback: 'test' },
      getEntity: drupalMixin.methods.getEntity,
    };

    expect(mixin.getEntity('doesnotexist')).toBe('test');
  });

  test('that getEntity method returns the correct component if present', () => {
    const mixin = {
      mapping: { fallback: 'fallback', button: 'button' },
      getEntity: drupalMixin.methods.getEntity,
    };

    expect(mixin.getEntity('button')).toBe('button');
  });

  test('that the mixin correctly instantiates the ResourceMixin', () => {
    const resourceMixin = drupalMixin.mixins[0];
    expect(resourceMixin).toHaveProperty('computed');
    expect(resourceMixin).toHaveProperty('mounted');
    expect(resourceMixin).toHaveProperty('serverPrefetch');
    expect(resourceMixin.methods).toHaveProperty('loadResource');
  });
});
