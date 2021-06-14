# Resource definition

A Resource defines a single item / entity from the backend.

The resource is defined by:
* The type of resource
* The id of the resource
* The data of the resource
* The metadata for the resource
* The [relationships] definition for this resource

## Creating a resource
Resources are always created via the Resource constructor. If you wish to create a new resource from your 
application use the Resource constructor to ensure a correct structure.

### example

```javascript
import { Resource } from '@hyral/core';

const newResource = new Resource(1, 'product', {/* data */});
```

## Resource metadata & meta

A Resource defines meta. This property contains information on the status of the Resource.

The **meta** property contains the metadata provided by the API. For example, the JSON:API format support the meta field
for each resource and this field is set to the **meta** property.

[relationships]: relationships.md
[resource decorators]: resource-decorators.md
