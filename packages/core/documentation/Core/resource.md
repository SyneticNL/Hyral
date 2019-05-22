# Resource definition

A Resource defines a single item / entity from the backend.

The resource is structured according to a JSON schema and defines:
* The type of resource
* The id of the resource
* The data of the resource
* The [relationships](relationships.md)

## Creating a resource

Resources are always created via the Resource.create function. If you wish to create a new resource from your 
application use the Resource.create function to ensure a correct structure.

## Resource decorators

Hyral support decorators for a Resource that can alter the behavior of a Resource without changing the way you interact
with a Resource.

Read more on the available decorators and how to create another one [here](resource-decorators.md).

## JSON Schema
A JSON schema is available for a resource [here](/packages/core/schema/resource.schema.json).
