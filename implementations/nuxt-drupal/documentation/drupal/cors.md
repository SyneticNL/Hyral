# CORS policy

When using a decoupled front-end it is important to update your cors policies accordingly.
An example can be found here in the Drupal `services.yml` for a query-only based resource system.

!**important**! Change at your own discretion as this can possibly provide security risks

```yml
cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['*']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: [HEAD, GET, OPTIONS]
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: true
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: false
```