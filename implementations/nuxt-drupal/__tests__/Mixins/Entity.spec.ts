import EntityMixin from '../../src/Mixins/Entity';

describe('the entity mixin', () => {
  test('that the entity mixin handles the resource as a prop', () => {
    expect(EntityMixin.props.resource.type).toEqual(Object);
    expect(EntityMixin.props.resource.required).toEqual(false);
  });
});
