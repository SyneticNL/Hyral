# The connector

The connector defines the protocol Hyral should use to talk to the backend. In theory the Connector concept
is backend and protocol agnostic. You can use HTTP to connect to another server or connect to a local database or even
the localstorage.

## HttpConnector
A common protocol/standard for communication is HTTP with REST. By default Hyral ships with a HTTP/REST connector
which uses Axios for the requests.

### Altering Axios behavior / adding security headers

As you pass an Axios instance to the HttpConnector you can set the Axios configuration according to your needs. After
passing the Axios instance the Hyral HttpConnector creates it's own instance to deference from the passed instance.

Note that the Hyral HttpConnector sets some configurations:
- The responseType is forced to JSON
- The paramsSerializer is overridden with the paramsSerializer from the passed transformer.
- The responseNormalizer is appended with the responsNormalizer from the passed transformer.
