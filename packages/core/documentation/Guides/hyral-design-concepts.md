# Hyral design concepts
This guide discuses the overall architecture and design of Hyral and the reasons why it's built the way it is.

1. [Hyral modal](#hyral-modal)
1. [Managed Resources](#hyral-resources)
1. [Managing and persisting changes to resources](#managing-and-persisting-changes-to-resources)
1. [Separation of Repository and Connector](#separation-of-repository-and-connector)
1. [Programming style & paradigms](#programming-style-&-paradigms)

## Hyral modal
Hyral is structured as follows:

<!-- TODO: incorrect -->
![Hyral model](assets/Hyral%20model.svg)

## Managed Resources
Hyral has a managed resource via the `Resource` object. Hyral uses this instead of a simple object to be able to add
various features in working with resources. The resources encapsulates all data . With
this Hyral can control how data is accessed and updated.

<!-- TODO: Move to core-with-state -->
<!-- ### State
A Resource has state management, every change to the Resource causes a new state on the stack to be created. With this 
approach Hyral can detect changes to the Resource. It's in theory even possible to revert the changes to a Resource by 
reverting to the previous state.

## Managing and persisting changes to resources
Many libraries for API usage offer direct functions on resources to persist changes to the API backend.

In many situations a single changed Resource might actually require multiple calls to the backend. It's also possible
that a single form contains multiple Resources that will all need to be updated after submission. For libraries that
only support persisting changes on a resource this would result in a large amount of custom code to handle all the 
separate calls to the backend. Hyral solves this with ChangeSets. As a developer you simply add all changes to a 
ChangeSet and Hyral will determine the required calls to the API and the correct order in which to execute them. This is
possible because the relationship model is known and Hyral is able to detect which changes have been made to the 
Resource.
So instead of having to implement custom code to do all the required API calls you simply persist all changes to the 
ChangeSet and execute the ChangeSet, easy! -->

## Programming style & paradigms

### Code quality
To ensure code quality all code is checked with the Airbnb linter and verified with automated unit tests. Furthermore
the code is structured into separate files, grouping functions together. Tests are in a separate directory which follows
the same tree structure as the src folder.

### Programming paradigms
The code for Hyral is written in an Object Programming style. A lot of attention has been given into object purity, 
immutability and containing side-effects.
