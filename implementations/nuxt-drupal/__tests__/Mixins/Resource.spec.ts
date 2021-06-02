import { Resource } from '@hyral/core';
import ResourceMixin from '../../src/Mixins/Resource';

describe('the resource mixin', () => {
  const hyralService = 'drupal';
  const mixin = ResourceMixin(hyralService) as {
    mixins: Record<string, unknown>[],
    props: { source: { default: () => Resource<unknown> } },
    data(): string,
  };
  const context = {
    $store: {
      state: {
        druxtRouter: {
          route: { props: { uuid: 'test', type: 'test' } },
        },
      },
    },
  };

  test('that the source defaults is a function and creates an empty resource', () => {
    expect(typeof mixin.props.source.default).toEqual('function');
    expect(mixin.props.source.default.call(context)).toEqual(new Resource('test', 'test'));
  });

  test('that the mixin extends the vue mixin', () => {
    expect(mixin.mixins[0].computed).toHaveProperty('resource');
    expect(mixin.mixins[0].methods).toHaveProperty('loadResource');
  });

  test('that the hyralService is set corrently', () => {
    const object = { hyralService };

    expect(mixin.data()).toEqual(object);
  });
});
