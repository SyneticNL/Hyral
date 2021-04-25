import DrupalPlugin from '../../src/Plugins/DrupalPlugin';

describe('the nuxt plugin', () => {
  test('that the plugin correctly initiates', () => {
    const options = {
      mapping: {
        nodes: ['node1', 'node2'],
        menus: ['menu1'],
        entities: { paragraph1: 'test' },
      },
      baseUrl: 'http://test.com',
      name: 'test',
    };

    const context = {
      store: {
        dispatch: jest.fn(),
        registerModule: jest.fn(),
      },
    };

    DrupalPlugin(options)(context as any);
    expect(context.store.dispatch).toHaveBeenCalled();
    expect(context.store.registerModule).toHaveBeenCalled();
  });

  test('that the plugin name defaults to \'drupal\' > \'hyral_drupal\'', () => {
    const options = {
      mapping: {
        nodes: ['node1', 'node2'],
        menus: ['menu1'],
        entities: { paragraph1: 'test' },
      },
      baseUrl: 'http://test.com',
    };

    const context = {
      store: {
        dispatch: jest.fn(),
        registerModule: jest.fn(),
      },
    };

    DrupalPlugin(options)(context as any);
    expect(context.store.registerModule).toBeCalledWith('hyral_drupal', expect.anything());
  });
});
