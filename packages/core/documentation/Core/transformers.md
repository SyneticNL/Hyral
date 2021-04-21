# Transformers

A transformer converts the message *format* from the backend to the Hyral-format and the other way around.

This enables the user to work with a single format (Hyral) in the code and have all backend specific logic in the 
transformers. The user then does not have to know how a specific backend works, only how Hyral works.

## Creating your own transformer
Please read the [creating a transformer] guide for instructions on how to create your own transformer.

## Connector & transformer
A transformer is attached to a Connector and each connector instance can have it's own transformer. This way each
connector can support a different message format and the created [repositories] can be connected to different backends.

## Transformer definition
A transformer consists of 4 parts:
* An urlSerializer
* A paramsSerializer
* A requestSerializer
* A responseNormalizer

### urlSerializer
The urlSerializer converts the ParameterBag and/or Entity into a URL that the backend will understand.

For example: A URL serializer for a JSON:API backend will result in the following URL for a product fetch() 
request: `/products` 

### paramsSerializer
The `fetch` and `fetchOne` repository methods provide a [ParameterBag]. The paramsSerializer converts the 
[ParameterBag] into a query string that can be used by the Connector and is understood by the backend.

### requestSerializer
A request serializer converts [Tasks] into a format the backend can process. To understand how Hyral processes changes
please read the [Tasks] section.

### responseNormalizer
The response normalizer converts the backend API response into the Hyral format.

The response normalizer results in converted resource(s) and when returning multiple resources information on paging.

[creating a transformer]: ../Guides/creating-transformers.md
[repositories]: repository.md
[ParameterBag]: parameterBag.md
[Tasks]: tasks.md
