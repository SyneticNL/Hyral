import isEmpty from 'lodash/isEmpty';
import { CreateElement, VNode } from 'vue';
import Entity from '../../src/Components/Entity';
import { IMapping } from '../../src/__types__';

type EntityMock = {
  mixins: [],
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
    expect(entity).toHaveProperty('render');

    expect(!isEmpty(entity.mixins)).toBeTruthy();
  });

  test('that the entity data function sets the mapping value', () => {
    expect(entity.data()).toEqual({ mapping });
  });

  test('that render calls createElement correctly with a resource', () => {
    const createElementMock = jest.fn() as CreateElement;
    const resource = { type: 'component' };
    const context = { resource };
    const expectedSettings = { props: { resource }, attrs: undefined, class: [] };

    entity.render.call(context, createElementMock);

    expect(createElementMock).toHaveBeenCalled();
    expect(createElementMock).toHaveBeenCalledWith(mapping.component, expectedSettings);
  });

  test('that render calls createElement correctly with a collection', () => {
    const createElementMock = jest.fn() as CreateElement;
    const collection = { type: 'component' };
    const context = { collection };
    const expectedSettings = { props: { collection }, attrs: undefined, class: [] };

    entity.render.call(context, createElementMock);

    expect(createElementMock).toHaveBeenCalled();
    expect(createElementMock).toHaveBeenCalledWith(mapping.component, expectedSettings);
  });

  test('that render calls createElement correctly without any source', () => {
    const createElementMock = jest.fn() as CreateElement;
    const context = {};
    const expectedSettings = { props: {}, attrs: undefined, class: [] };

    entity.render.call(context, createElementMock);

    expect(createElementMock).toHaveBeenCalled();
    expect(createElementMock).toHaveBeenCalledWith(null, expectedSettings);
  });
});
