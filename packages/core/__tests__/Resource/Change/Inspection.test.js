import {
  resourceHasChanged,
  resourceIsNew,
  isTask,
} from '../../../src/Resource/Change/Inspection';
import Resource from '../../../src/Resource/Resource';
import Task from '../../../src/Resource/Change/Task/Task';

describe('Inspection tests', () => {
  test('that a new resource is detected correctly', () => {
    const resource = Resource.create(null, 'product');
    expect(resourceIsNew(resource)).toBeTruthy();

    const existingResource = Resource.create(1, 'product');
    expect(resourceIsNew(existingResource)).toBeFalsy();
  });

  test('that a resource change is detected correctly', () => {
    const resource = Resource.create(1, 'product', { title: 'A great product' });

    expect(resourceHasChanged(resource)).toBeFalsy();

    resource.data = { title: 'An even greater product' };
    expect(resourceHasChanged(resource)).toBeTruthy();
  });

  test('that a a change on a related resource is not detected as a change on the resource itself', () => {
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const resource = Resource.create(1, 'book', {
      title: 'A great book',
      author,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
    });

    expect(resourceHasChanged(resource)).toBeFalsy();

    author.data = {
      name: 'An even greater author',
    };

    expect(resourceHasChanged(resource)).toBeFalsy();
  });

  test('that a task is detected correctly', () => {
    const task = Task('create', {}, {});

    expect(isTask(task)).toBeTruthy();
    expect(isTask({})).toBeFalsy();
    expect(isTask(undefined)).toBeFalsy();
    expect(isTask('')).toBeFalsy();
    expect(isTask(0)).toBeFalsy();
  });
});
