import DrupalPlugin from '../../src/Plugins/Hyral';

describe('the nuxt plugin', () => {
  const options = {
    mapping: { menu1: null, node1: () => {}, paragraph1: { default: () => {} } },
  };

  test('that the plugin correctly initiates', () => {
    const options1 = { ...options, name: 'test' };

    const context = {
      store: {
        registerModule: jest.fn(),
      },
      app: { $config: {} },
    };

    DrupalPlugin(options1 as any)(context as any);
    expect(context.store.registerModule).toBeCalledWith('hyral_test', expect.anything());
  });

  test('that the plugin name defaults to \'drupal\' > \'hyral_drupal\'', () => {
    const context = {
      store: {
        registerModule: jest.fn(),
      },
      app: { $config: {} },
    };

    DrupalPlugin(options as any)(context as any);
    expect(context.store.registerModule).toBeCalledWith('hyral_drupal', expect.anything());
  });
});
