# Transformers

The transformers are an important part of Hyral as they translate the Hyral structure and logic for each type of
backend API.

The transformers are attached to a Connector.

A transformer consists of 4 parts:

* An URL serializer
* A param serializer
* A request serializer
* A response normalizer

## An URL serializer
The URL serializer converts the ParameterBag and/or Entity into a URL that the backend will understand.

For example: A URL serializer for a JsonApi backend will result in the following URL for a product fetch() request:

'/api/root/products' 

## A param serializer
The fetch() method may provide a [parameterBag](parameterBag.md) for filtering, sorting or paging. The param serializer
converts the [ParameterBag](parameterBag.md) into a query string that can be used by the Connector and is understood
by the backend API.

## A request serializer
TODO.

## A response normalizer
The response normalizer converts the backend API response into the Hyral format.

The response normaliser results in an array of resources or a single resource in the data property and when returning
multiple resources information on paging in the paging property.

## Notes
You will only need to make a transformer if you want to use a backend API type that is not supported by Hyral or 
any other additional package. Currently Hyral only supports JsonApi backends.

