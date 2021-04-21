import '../../src/__types__/DruxtRouterModule.d';

import DruxtRouterModule from 'druxt-router';
import DrupalNuxtModule from '../../src/Modules';
import { INuxtContext } from '../../src/__types__';

const moduleOptionsMock = {
  mapping: {
    nodes: ['node1', 'node2'],
    menus: ['menu1'],
    entities: { paragraph1: 'test' },
  },
  baseUrl: 'http://test.com',
};

describe('the DrupalNuxtModule', () => {
  test('that the module correctly calls the nuxt methods', async () => {
    const self = ({} as unknown) as INuxtContext;
    self.addPlugin = jest.fn();
    self.requireModule = jest.fn();

    const src = expect.stringContaining('HyralPlugin.js') as unknown;
    const options = {
      repositories: [
        'node1', 'node2', 'menu1', 'paragraph1',
      ],
      baseUrl: moduleOptionsMock.baseUrl,
    };
    const fileName = 'hyral-plugin.js';

    expect.assertions(4);
    await DrupalNuxtModule.call(self, moduleOptionsMock).then(() => {
      expect(self.addPlugin).toBeCalled();
      expect(self.requireModule).toBeCalled();
      expect(self.addPlugin).toBeCalledWith(expect.objectContaining({ src, fileName, options }));
      expect(self.requireModule).toBeCalledWith(DruxtRouterModule, true);
    });
  });

  test('that the module throws an error in the wrong context', () => {
    const self = ({} as unknown) as INuxtContext;
    self.addPlugin = undefined;
    self.requireModule = undefined;

    expect.assertions(1);
    DrupalNuxtModule.call(self, moduleOptionsMock).catch((err: Record<string, any>) => {
      expect(err.message).toBe('Make sure to use the DrupalNuxtModule in a Nuxt environment');
    });
  });

  test('that the module throws an error without all moduleOptions', () => {
    const self = ({} as unknown) as INuxtContext;
    self.addPlugin = jest.fn();
    self.requireModule = jest.fn();
    const module = DrupalNuxtModule;
    const moduleOptions1 = { baseUrl: moduleOptionsMock.baseUrl, mapping: undefined };
    const moduleOptions2 = { mapping: moduleOptionsMock.mapping, baseUrl: undefined };

    expect.assertions(2);
    module.call(self, moduleOptions1).catch((err: Record<string, any>) => {
      expect(err.message).toBe('DrupalNuxtModule requires a mapping in moduleOptions');
    });

    module.call(self, moduleOptions2).catch((err: Record<string, any>) => {
      expect(err.message).toBe('DrupalNuxtModule requires a baseUrl in moduleOptions');
    });
  });
});
