import { matchers } from 'jest-json-schema';
import resourceJsonSchema from '../../../schema/resource.schema';

expect.extend(matchers);

describe('JSON schema validatios', () => {
  test('that the resource JSON schema is valid', () => {
    expect(resourceJsonSchema).toBeValidSchema();
  });
});
