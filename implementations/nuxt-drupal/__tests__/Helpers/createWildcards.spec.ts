import createWildcards from '../../src/Helpers/createWildcards';

describe('the wildcard generator', () => {
  test('that it returns a list of correct length', () => {
    const list = createWildcards(5, {});

    expect(list).toHaveLength(5);
  });

  test('that the wildcard generator returns the correct list', () => {
    const component = {};
    const props = { drupal: true };
    const list1 = [
      {
        name: 'drupal_1', path: '/:wildcard_1', component, props,
      },
    ];
    const list2 = [
      {
        name: 'drupal_1', path: '/:wildcard_1', component, props,
      },
      {
        name: 'drupal_2', path: '/:wildcard_1/:wildcard_2', component, props,
      },
    ];
    const list3 = [
      {
        name: 'drupal_1', path: '/:wildcard_1', component, props,
      },
      {
        name: 'drupal_2', path: '/:wildcard_1/:wildcard_2', component, props,
      },
      {
        name: 'drupal_3', path: '/:wildcard_1/:wildcard_2/:wildcard_3', component, props,
      },
    ];

    const result1 = createWildcards(1, {});
    const result2 = createWildcards(2, {});
    const result3 = createWildcards(3, {});

    expect(result1).toEqual(list1);
    expect(result2).toEqual(list2);
    expect(result3).toEqual(list3);
  });
});
