# Resource repository

For each type of Resource a Resource Repository must be created. When getting, creating, updating or deleting resources you use
the API functions of the Resource Repository.

A Resource Repository is connected to one Connector instance. Each Resource Repository can be connected to a different
Connector.

## Resource repository manager

Each resource repository should be created via the repository manager as this creates a central storage for all repositories.

This enables various extra features as lazy loading and persisting nested entities.
