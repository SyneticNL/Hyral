import getEntity from '../../src/Helpers/getEntity';

describe('the getEntity function', () => {
  test('that getEntity throws an error without a mapping', () => {
    expect(() => getEntity()).toThrowError('No computed mapping found');
  });

  test('that getEntity returns fallback as null or a component', () => {
    const noFallback = {};
    const fallback = { fallback: {} };

    expect(getEntity(undefined, noFallback)).toEqual(null);
    expect(getEntity(undefined, fallback)).toEqual({});
    expect(getEntity('noexist', noFallback)).toEqual(null);
    expect(getEntity('noexist', fallback)).toEqual({});
  });

  test('that getEntity returns when mapping resolves to a function', () => {
    const mapping = { component: () => {} };

    expect(getEntity('component', mapping)).toEqual(mapping.component);
  });

  test('that getEntity returns when viewMode is defaulted', () => {
    const mapping = { component: { default: () => {} } };

    expect(getEntity('component', mapping)).toEqual(mapping.component.default);
  });

  test('that getEntity returns when viewMode is selected', () => {
    const mapping = { component: { default: () => {}, teaser: () => {} } };
    const viewMode = 'teaser';

    expect(getEntity('component', mapping, viewMode)).toEqual(mapping.component.teaser);
  });

  test('that getEntity throws an error when no default viewMode is present', () => {
    const mapping = { component: {} };
    const expectedError = 'No \'default\' view mode value present in component mapping.';

    expect(() => getEntity('component', mapping)).toThrowError(expectedError);
  });

  test('that getEntity throws an error when viewMode is not present', () => {
    const mapping = { component: {} };
    const viewMode = 'teaser';
    const expectedError = 'No \'teaser\' view mode value present in component mapping.';

    expect(() => getEntity('component', mapping, viewMode)).toThrowError(expectedError);
  });
});
