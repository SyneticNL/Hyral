import Resource from '../../../src/Resource/Resource';
import {
  getChangedResourceRelations,
  getAllRelatedResources, getDeletedOneToOneRelatedResources,
} from '../../../src/Resource/Change/Relation/Relation';
import { resourceHasChanged } from '../../../src/Resource/Change/Inspection';

describe('Relation tests', () => {
  test('that relations are correctly returned', () => {
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const publications = [
      Resource.create(3, 'publication', { year: 1900 }),
      Resource.create(4, 'publication', { year: 1901 }),
    ];
    const resource = Resource.create(1, 'book', {
      title: 'A great book',
      author,
      publications,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
      publications: {
        resource: 'publication',
        cardinality: 'one-to-many',
      },
      coverImage: {
        resource: 'image',
        cardinality: 'many-to-one',
      },
    });

    const relatedResources = getAllRelatedResources(resource);
    expect(relatedResources).toHaveLength(3);
    expect(relatedResources[0]).toBe(author);
    expect(relatedResources[1]).toBe(publications[0]);
    expect(relatedResources[2]).toBe(publications[1]);

    expect(getAllRelatedResources({})).toEqual([]);
  });

  test('that changes in relations are correctly detected', () => {
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const publications = [
      Resource.create(3, 'publication', { year: 1900 }),
    ];
    const resource = Resource.create(1, 'book', {
      title: 'A great book',
      author,
      publications,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
      publications: {
        resource: 'publication',
        cardinality: 'one-to-many',
      },
      coverImage: {
        resource: 'image',
        cardinality: 'many-to-one',
      },
    });

    expect(resourceHasChanged(resource)).toBeFalsy();
    expect(getChangedResourceRelations(resource)).toHaveLength(0);
    expect(getChangedResourceRelations({})).toEqual([]);

    resource.data = {
      title: 'A great book',
      author: Resource.create(4, 'author', { name: 'Another great author' }),
      publications: [Resource.create(5, 'publication', { year: 1901 })],
    };

    const changedRelations = getChangedResourceRelations(resource);

    expect(resourceHasChanged(resource)).toBeTruthy();
    expect(changedRelations).toHaveLength(2);
    expect(changedRelations).toEqual(['author', 'publications']);
  });

  test('that changes on a property of a relation are not registered as relation change', () => {
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

    author.data = {
      name: 'An even greater author',
    };

    const changedRelations = getChangedResourceRelations(resource);
    expect(changedRelations).toHaveLength(0);
  });

  test('that a correct list of deleted one-to-one resources is returned', () => {
    const author = Resource.create(2, 'author', { name: 'A great author' });
    const thumb = Resource.create('2', 'image', { src: 'some/image2.png' });
    const resource = Resource.create(1, 'book', {
      title: 'A great book',
      author,
      thumb,
    }, {
      author: {
        resource: 'author',
        cardinality: 'many-to-one',
      },
      thumb: {
        resource: 'image',
        cardinality: 'one-to-one',
      },
      coverStory: {
        resource: 'cover-story',
        cardinality: 'one-to-one',
      },
    });

    resource.data = {
      title: 'A great book',
    };

    const deletedResources = getDeletedOneToOneRelatedResources(resource);

    expect(deletedResources).toHaveLength(1);
    expect(deletedResources[0]).toBe(thumb);
  });
});
