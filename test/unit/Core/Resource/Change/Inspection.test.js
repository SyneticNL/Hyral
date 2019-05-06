import {
  resourceHasChanged,
  resourceIsNew,
} from '../../../../../src/Core/Resource/Change/Inspection';
import Resource from '../../../../../src/Core/Resource/Resource';

describe('Inspection tests', () => {
  test('that a new resource is detected correctly', () => {
    const resource = Resource(null, 'product');
    expect(resourceIsNew(resource)).toBeTruthy();

    const existingResource = Resource(1, 'product');
    expect(resourceIsNew(existingResource)).toBeFalsy();
  });

  test('that a resource change is detected correctly', () => {
    const resource = Resource(1, 'product', { title: 'A great product' });

    expect(resourceHasChanged(resource)).toBeFalsy();

    resource.data = { title: 'An even greater product' };
    expect(resourceHasChanged(resource)).toBeTruthy();
  });
});
