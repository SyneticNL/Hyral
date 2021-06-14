import { Resource } from '@hyral/core';
import ContentMixin from '../../src/Mixins/Content';

describe('the resource mixin', () => {
  const hyralService = 'drupal';
  const mixin = ContentMixin(hyralService) as {
    mixins: Record<string, unknown>[],
    props: { source: { default: () => Resource<unknown> } },
    watch: { source: { handler(): void } },
    data(): string,
  };

  test('that the source with root as true defaults to Druxt', () => {
    const context = {
      $store: {
        state: {
          druxtRouter: {
            route: { props: { uuid: 'test', type: 'test' } },
          },
        },
      },
      $options: {
        propsData: {
          root: true,
        },
      },
    };

    expect(typeof mixin.props.source.default).toEqual('function');
    expect(mixin.props.source.default.call(context)).toEqual(new Resource('test', 'test'));
  });

  test('that the source without root as true defaults to undefined', () => {
    const context = {
      $store: {
        state: {
          druxtRouter: {
            route: { props: { uuid: 'test', type: 'test' } },
          },
        },
      },
      $options: { propsData: null },
    };

    expect(typeof mixin.props.source.default).toEqual('function');
    expect(mixin.props.source.default.call(context)).toEqual(undefined);
  });

  test('that the mixin extends the vue mixins', () => {
    expect(mixin.mixins[0].computed).toHaveProperty('resource');
    expect(mixin.mixins[0].methods).toHaveProperty('loadResource');
    expect(mixin.mixins[1].computed).toHaveProperty('collection');
    expect(mixin.mixins[1].methods).toHaveProperty('loadCollection');
  });

  test('that the source as collection is correctly watched', () => {
    const context = {
      loadCollection: jest.fn(),
      loadResource: jest.fn(),
      collection: {},
    };

    mixin.watch.source.handler.call(context);

    expect(context.loadCollection).toHaveBeenCalled();
    expect(context.loadResource).not.toHaveBeenCalled();
  });

  test('that the source as resource is correctly watched', () => {
    const context = {
      loadCollection: jest.fn(),
      loadResource: jest.fn(),
      resource: {},
    };

    mixin.watch.source.handler.call(context);

    expect(context.loadResource).toHaveBeenCalled();
    expect(context.loadCollection).not.toHaveBeenCalled();
  });

  test('that the hyralService is set corrently', () => {
    const object = { hyralService };

    expect(mixin.data()).toEqual(object);
  });
});
