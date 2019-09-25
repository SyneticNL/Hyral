# Creating, updating and deleting resources
This page describes the process of resource mutations and the way you send these mutations to the backend using a
ChangeSet.

## Resource manipulation

### Creating a new resource
If you want to create a new resource use the `Resource` factory function and pass `null` as the ID.

```javascript
const newResource = Resource.create(null, 'book', { title: 'A great book' });
```

### Changing an existing resource
If you want to make changes to a resource you can overwrite the data object.

```javascript
// Assume the availability of a resource with the id 1.
const resource = Resource.create(1, 'book', { title: 'A great book', pages: 300 });

// Update the title.
resource.data = { title: 'An even greater book', pages: 300 };

// A more convenient way when only changing a specific resource.
resource.data = { ...resource.data, title: 'An even greater book' };
```

* Note 1: any property not included in the new data object will be removed!
* Note 2: never directly change a property of the data object itself. Mutations via this method will not enable Hyral to 
  detect changes on the resource and it will therefore not be detected as changed.

### Deleting a resource
To delete a resource you have create a ChangeSet and call the method `deleteResource`. See the next sections on a more
complete description of the ChangeSet functionality.

## Sending changes to the backend
Once you have mutations on resources (either new, updated or deleted) you'll want to send these changes to the backend.

With Hyral you collect all changes together in a ChangeSet. A ChangeSet is an executable collection of tasks. Once 
created, you can call various methods on the ChangeSet with a resource to queue changes.

* If you want to create or update a resource you can use the method `persistResource` or `persistCascaseResource` (more
  on this later).
* When deleting a resource use the `deleteResource` method.

These methods queue tasks in the ChangeSet. Once you have added all your required mutations you then call `execute` to
send all the tasks to the backend. Hyral will make sure all requested mutations are executed in the correct order
and all the dependencies are taken care of.

### Cascaded update of a resource
A normal `persistResource` call will only queue changes to the resource itself. That means changes to it's attributes or
which resources are related to the resource, not changes on the related resources themselves.

If you want Hyral to also queue changes to the related resources call `persistCascadeResource`, this will also queue
changes to the related resources. For example: if you are creating a new resource and add it to an existing resource, 
use `persistCascade` on the existing resource and Hyral will queue 3 tasks:

1. Create the new resource
1. Relate the new resource to the existing resource
1. Update the existing resource

* *Note: Point 3 might seem unnecessary but depending on the type of transformer you might have to change the relation 
on a resource via an update task.*

### Tracking progress
You can monitor the progress of a ChangeSet execution via the `status` method. This will report the number or tasks and
the number of resolved tasks. You can use this function to show progress to the user. See the example for how it
could be used.

### Example
```javascript

// Create an existing resource and mutate it's data.
const resource = Resource.create(1, 'book', { title: 'A great book' });
resource.data = { title: 'An even greater book' };

// Create a new resource.
const newResource = Resource.create(null, 'book', { title: 'A great book' });

// Create an ChangeSet object.
const changes = ChangeSet();

// Queue persist tasks for the resources that have been added / updated.
changes.persistResource(resource);
changes.persistResource(newResource);

// Notify the user of the progress.
const interval = setInterval(() => {
  console.log(`${changes.status().resolved} of ${changes.status().total} tasks resolved`);
}, 100);

// Execute all queued ChangeSet.
changes.execute().then(() => {
  clearInterval(interval);

  console.log('done!');
});
```
