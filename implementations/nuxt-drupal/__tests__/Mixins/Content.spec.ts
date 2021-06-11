import { Resource } from '@hyral/core';
import ContentMixin from '../../src/Mixins/Content';

describe('the resource mixin', () => {
  const hyralService = 'drupal';
  const mixin = ContentMixin(hyralService) as {
    mixins: Record<string, unknown>[],
    props: { source: { default: () => Resource<unknown> } },
    watch: { source(): void },
    data(): string,
  };

  test('that the source defaults is a function and creates an empty resource', () => {
    const context = {
      $store: {
        state: {
          druxtRouter: {
            route: { props: { uuid: 'test', type: 'test' } },
          },
        },
      },
    };

    expect(typeof mixin.props.source.default).toEqual('function');
    expect(mixin.props.source.default.call(context)).toEqual(new Resource('test', 'test'));
  });

  test('that the mixin extends the vue mixin', () => {
    expect(mixin.mixins[0].computed).toHaveProperty('resource');
    expect(mixin.mixins[0].methods).toHaveProperty('loadResource');
  });

  test('that the source as collection is correctly watched', () => {
    const context = {
      loadCollection: jest.fn(),
      loadResource: jest.fn(),
      collection: {},
    };

    mixin.watch.source.call(context);

    expect(context.loadCollection).toHaveBeenCalled();
    expect(context.loadResource).not.toHaveBeenCalled();
  });

  test('that the source as resource is correctly watched', () => {
    const context = {
      loadCollection: jest.fn(),
      loadResource: jest.fn(),
      resource: {},
    };

    mixin.watch.source.call(context);

    expect(context.loadResource).toHaveBeenCalled();
    expect(context.loadCollection).not.toHaveBeenCalled();
  });

  test('that the hyralService is set corrently', () => {
    const object = { hyralService };

    expect(mixin.data()).toEqual(object);
  });
});
