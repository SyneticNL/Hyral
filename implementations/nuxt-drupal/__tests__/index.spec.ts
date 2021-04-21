import nuxtdrupal from '../src';
import * as options from '../src';
import DrupalNuxtModule from '../src/Modules/index';
import DrupalMixin from '../src/Mixins/DrupalMixin';
import DrupalMiddleware from '../src/Middleware/DrupalMiddleware';
import createWildcards from '../src/Helpers/createWildcards';

describe('the nuxt-drupal index', () => {
  test('that nuxt-drupal exports the correct features', () => {
    expect(nuxtdrupal).toEqual(DrupalNuxtModule);
    expect(options).toEqual(expect.objectContaining({
      DrupalMixin,
      DrupalMiddleware,
      createWildcards,
    }));
  });
});
