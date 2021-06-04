import { validateBaseUrl, validateMapping, validateOptions } from '../../../src/Plugins/Validators/Options';

describe('the validators', () => {
  test('that the validateOptions throws the error without options', () => {
    expect(validateOptions).toThrowError('DrupalNuxtPlugin requires options as a parameter');
  });

  test('that the validateBaseUrl throws the error without a baseUrl', () => {
    const options = {};

    expect(() => validateBaseUrl(options as any)).toThrowError('DrupalNuxtPlugin requires a baseUrl in options');
  });

  test('that the validateMapping throws the error when no mapping is found', () => {
    const options = {};

    expect(() => validateMapping(options as any)).toThrowError('DrupalNuxtPlugin requires a mapping in options');
  });

  test('that the validateMapping allows an empty mapping', () => {
    const options = { mapping: {} };

    expect(() => validateMapping(options as any)).not.toThrow();
  });

  test('that the validateMapping only allows async components', () => {
    const validOptions = { mapping: { function: () => {}, record: { default: () => {} } } };
    const faultOptions1 = { mapping: { component: {} } };
    const faultyOptions2 = { mapping: { component: { default: {} } } };
    const error = 'Mapping should consist of: \n\n1: An async component\n2: A record of async components \n3: Have a null value';

    expect(() => validateMapping(validOptions as any)).not.toThrow();
    expect(() => validateMapping(faultOptions1 as any)).toThrowError(error);
    expect(() => validateMapping(faultyOptions2 as any)).toThrowError(error);
  });

  test('that the validateMapping allows null values', () => {
    const options = { mapping: { component: null } };

    expect(() => validateMapping(options as any)).not.toThrow();
  });
});
