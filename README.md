# Websocket Server Template with documentation
Basic template that allows a single websocket route with a multiple handler of websocket messages

## Startup
```sh
$ yarn install
$ yarn docs
$ yarn start
# localhost:3000/documentation
```

## Documentation generator
To add new documentation follow the next steps:  
1. Add a new schema on `src/schemas` and export the zodToJsonSchema variable
2. Add the new schema on `src/lib/documentation` to be written to a json file
3. On `documentation/asyncapi.yaml` create a new `channel`
4. Run `yarn docs` to produce the html output