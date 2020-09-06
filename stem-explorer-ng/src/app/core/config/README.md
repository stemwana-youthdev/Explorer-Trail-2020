# Config Service

The Config Service will call the project variables defined in the environments.

For local development, set env vars in the src/env.js file.

For production or running in docker, set it as env variable for docker container.

## An example of how to call one of the environment variables:

Inject Config Service into the constructor:

`constructor(private configService: ConfigService) {}`

And add ConfigService to the imports list.

Then you can use the `get` function in the service to get a variable like:

`this.configService.get<string>('API_ENDPOINT')`