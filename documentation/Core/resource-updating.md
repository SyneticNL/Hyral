# Actions

Actions contain tasks

A task is a change/deletion that needs to be processed. Each relationship mutation is it's own task.
A task can have related tasks. A task can have dependencies that need to be resolved before this
task can be executed.

# Updating/adding a resource

```javascript
import Actions from 'src/Core/Resource/Actions/Actions';

// Create an existing resource and mutate it's data.
const resource = Resource(1, 'book', { title: 'A great book' });
resource.data = { title: 'An even greater book' };

// Create a new resource.
const newResource = Resource(null, 'book', { title: 'A great book' });

// Create an actions object.
const actions = Actions();

// Queue persist tasks for the resources that have been added / updated.
actions.persistResource(resource);
actions.persistResource(newResource);

// Notify the user of the progress.
const interval = setInterval(() => {
  console.log(`${actions.status().resolved} of ${actions.status().total} tasks resolved`);
}, 100);

// Execute all queued actions.
actions.execute().then(() => {
  clearInterval(interval);

  console.log('done!');
});
```
