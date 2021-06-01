import '../src/__types__/DruxtRouterModule.d';
import DruxtRouterModule from 'druxt-router';
import DrupalNuxtModule, { INuxtContext } from '../src';

import * as options from '../src';
import EntityMixin from '../src/Mixins/EntityMixin';
import ResourceMixin from '../src/Mixins/ResourceMixin';
import DrupalMiddleware from '../src/Middleware/DrupalMiddleware';
import DrupalPlugin from '../src/Plugins/DrupalPlugin';

describe('the nuxt-drupal index', () => {
  test('that nuxt-drupal exports the correct features', () => {
    expect(options).toEqual(expect.objectContaining({
      EntityMixin,
      ResourceMixin,
      DrupalMiddleware,
      DrupalPlugin,
    }));
  });
});

describe('the DrupalNuxtModule', () => {
  test('that the module correctly calls the druxt-router', async () => {
    const self = ({} as unknown) as INuxtContext;
    self.requireModule = jest.fn();

    expect.assertions(2);
    await DrupalNuxtModule.call(self).then(() => {
      expect(self.requireModule).toBeCalled();
      expect(self.requireModule).toBeCalledWith(DruxtRouterModule, true);
    });
  });

  test('that the module throws an error without the right context', async () => {
    const self = ({} as unknown) as INuxtContext;

    expect.assertions(1);
    await DrupalNuxtModule.call(self).catch((err: Error) => {
      expect(err.message).toEqual('Make sure to use the DrupalNuxtModule in a Nuxt environment');
    });
  });
});
