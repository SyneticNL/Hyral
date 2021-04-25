import { IMapping, IOptions } from '../../../src';
import { validateBaseUrl, validateMapping, validateOptions } from '../../../src/Plugins/Validators/Mapping';

describe('the validators', () => {
  test('that the validateOptions throws the error without options', () => {
    expect(validateOptions).toThrowError('DrupalNuxtPlugin requires options as a parameter');
  });

  test('that the validateBaseUrl throws the error without a baseUrl', () => {
    const options = {} as unknown as IOptions<IMapping>;

    expect(() => validateBaseUrl(options)).toThrowError('DrupalNuxtPlugin requires a baseUrl in options');
  });

  test('that the validateMapping throws the error when no mapping is found', () => {
    const options = {} as unknown as IOptions<IMapping>;

    expect(() => validateMapping(options)).toThrowError('DrupalNuxtPlugin requires a mapping in options');
  });

  test('that the validateMapping throws the error when all attributes are not present', () => {
    const options = { mapping: {} } as unknown as IOptions<IMapping>;

    expect(() => validateMapping(options)).toThrowError('DrupalNuxtPlugin requires a nodes, menus and entities attribute');
  });

  test('that the validateMapping throws the error when nodes and menus aren\'t of type Array', () => {
    const options = {
      mapping: {
        nodes: {},
        menus: {},
        entities: {},
      },
    } as unknown as IOptions<IMapping>;

    expect(() => validateMapping(options)).toThrowError('DrupalNuxtPlugin requires nodes and menus as array');
  });

  test('that the validateMapping throws the error when nodes and menus aren\'t of type Array', () => {
    const options = {
      mapping: {
        nodes: [],
        menus: [],
        entities: [],
      },
    } as unknown as IOptions<IMapping>;

    expect(() => validateMapping(options)).toThrowError('DrupalNuxtPlugin requires entities to be a record');
  });
});
