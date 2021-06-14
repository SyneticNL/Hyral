import parseMenuCollection from '../../src/Helpers/parseMenuCollection';
import input from './fixtures/menuInput.json';
import output from './fixtures/menuOutput.json';

describe('the parseMenuCollection function', () => {
  test('that the function returns the valid structure', () => {
    const result = parseMenuCollection(input as any);
    expect(result).toEqual(output);
  });

  test('that the function returns an empty array when the collection is empty', () => {
    const result = parseMenuCollection({} as any);
    expect(result).toEqual([]);
  });

  test('that the function returns an empty array when null is provided', () => {
    const result = parseMenuCollection(null as any);
    expect(result).toEqual([]);
  });

  test('that the function handles options', () => {
    const options = { prefix: '/prefix', postfix: '/postfix' };
    const result = parseMenuCollection(input as any, options) as Record<string, unknown>[];
    expect(result[0].url).toEqual('/prefix/postfix');
  });
});
