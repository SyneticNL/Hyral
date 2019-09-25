# Resource definition

A Resource defines a single item / entity from the backend.

The resource is structured according to a JSON schema and defines:
* The type of resource
* The id of the resource
* The data of the resource
* The meta information defined by the server for the resource
* The metadata defined by Hyral for the resource, this is not stored in the Resource state
* The [relationships] definition for this resource

## Creating a resource
Resources are always created via the Resource.create function. If you wish to create a new resource from your 
application use the Resource.create function to ensure a correct structure.

## Resource decorators
Hyral support decorators for a Resource that can alter the behavior of a Resource without changing the way you interact
with a Resource.

Read more on the available decorators and how to create another one in the [resource decorators] section.

## Resource metadata & meta

A Resource defines both metadata and meta. This might seem duplicate but the split has a reason. The **metadata** property
defines metadata that is managed by Hyral. This property contains information on the status of the Resource like
loading and loaded. This property is not part of the Resource state.

The **meta** property contains the metadata provided by the API. For example, the JSON:API format support the meta field
for each resource and this field is set to the **meta** property.

## JSON Schema
A JSON schema is available for a resource [here](/packages/core/schema/resource.schema.json).

[relationships]: relationships.md
[resource decorators]: resource-decorators.md
