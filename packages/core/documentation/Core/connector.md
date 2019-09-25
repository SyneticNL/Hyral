# The connector
The connector defines the protocol Hyral should use to talk to the backend. In theory the Connector is backend and
protocol agnostic. You can use HTTP to connect to a server, a local database or even the localstorage.

## HttpConnector
A common protocol/standard for communication is HTTP with REST. By default Hyral ships with a HTTP/REST connector which
uses Axios for the requests.

### Altering Axios behavior / adding security headers
As you pass an Axios instance to the HttpConnector you can set the Axios configuration according to your needs. After
passing the Axios instance the Hyral HttpConnector creates it's own instance to deference from the passed instance, 
make sure to initialize everything correctly for the Axios instance before passing it to the HttpConnector.

Note that the Hyral HttpConnector sets some configurations:
* The responseType is set to JSON if the responseFormatter of the transformer does define a responseType.
* The paramsSerializer is overridden with the paramsSerializer from the passed transformer.
