import isEmpty from 'lodash/isEmpty';
import {
  AsyncComponent, Component, CreateElement, VNode,
} from 'vue';
import Entity from '../../src/Components/Entity';
import { IMapping } from '../../src/__types__';

type EntityMock = {
  mixins: [],
  methods: { getEntity(name?: string): AsyncComponent | Component | null },
  render(createElement: CreateElement): VNode,
  data(): IMapping
};

describe('the drupal entity', () => {
  const mapping = { component: () => {} };
  const entity = Entity('drupal', mapping) as EntityMock;

  test('that the entity has the correct properties', () => {
    expect(entity).toBeTruthy();
    expect(entity).toHaveProperty('name');
    expect(entity).toHaveProperty('mixins');
    expect(entity).toHaveProperty('props');
    expect(entity).toHaveProperty('data');
    expect(entity).toHaveProperty('methods');
    expect(entity).toHaveProperty('render');

    expect(!isEmpty(entity.mixins)).toBeTruthy();
    expect(entity.methods).toHaveProperty('getEntity');
  });

  test('that the entity data function sets the mapping value', () => {
    expect(entity.data()).toEqual({ mapping });
  });

  test('that getEntity throws an error without a mapping', () => {
    const context = { $props: { viewMode: undefined } };

    expect(() => entity.methods.getEntity.call(context, '')).toThrowError('No computed mapping found');
  });

  test('that getEntity returns fallback as null or a component', () => {
    const contextWithoutFallback = { mapping: {} };
    const contextWithFallback = { mapping: { fallback: {} } };

    expect(entity.methods.getEntity.call(contextWithoutFallback)).toEqual(null);
    expect(entity.methods.getEntity.call(contextWithFallback)).toEqual({});
    expect(entity.methods.getEntity.call(contextWithoutFallback, 'noexist')).toEqual(null);
    expect(entity.methods.getEntity.call(contextWithFallback, 'noexist')).toEqual({});
  });

  test('that getEntity returns when mapping resolves to a function', () => {
    const context = { mapping: { component: () => {} } };

    expect(entity.methods.getEntity.call(context, 'component')).toEqual(context.mapping.component);
  });

  test('that getEntity returns when viewMode is defaulted', () => {
    const context = { mapping: { component: { default: () => {} } } };

    expect(entity.methods.getEntity.call(context, 'component')).toEqual(context.mapping.component.default);
  });

  test('that getEntity returns when viewMode is selected', () => {
    const context = { $props: { viewMode: 'teaser' }, mapping: { component: { default: () => {}, teaser: () => {} } } };

    expect(entity.methods.getEntity.call(context, 'component')).toEqual(context.mapping.component.teaser);
  });

  test('that getEntity throws an error when no default viewMode is present', () => {
    const context = { mapping: { component: {} } };
    const expectedError = 'No \'default\' view mode value present in component mapping.';

    expect(() => entity.methods.getEntity.call(context, 'component')).toThrowError(expectedError);
  });

  test('that getEntity throws an error when viewMode is not present', () => {
    const context = { $props: { viewMode: 'teaser' }, mapping: { component: {} } };
    const expectedError = 'No \'teaser\' view mode value present in component mapping.';

    expect(() => entity.methods.getEntity.call(context, 'component')).toThrowError(expectedError);
  });

  test('that render calls createElement with the correct properties', () => {
    const createElementMock = jest.fn() as CreateElement;
    const getEntityContext = { mapping: { component: () => {} } };
    const context = { getEntity: entity.methods.getEntity.bind(getEntityContext), resource: { type: 'component' } };
    const expectedSettings = { props: { resource: context.resource }, attrs: undefined, class: [] };

    entity.render.call(context, createElementMock);

    expect(createElementMock).toHaveBeenCalled();
    expect(createElementMock).toHaveBeenCalledWith(context.getEntity('component'), expectedSettings);
  });
});
