# Twitter social agent framework

## The code

To run this demo, you will need:

- NodeJS (v8+, support for ES2017)
- npm (node package manager)

### Setup the code
```
$ git clone https://github.com/capJavert/twitter-social-agent-framework.git
$ cd twitter-social-agent-framework
$ pip install
```

### Running API server
- **server is not needed for running agent simulations it is only a showcase of custom Twitter API**
```
$ node server.js
```
- you may need to allow connections in your firewall
- server runs on localhost:3000
- check src/routes.js for available methods

### Running example simulation
- fill USERNAME and PASSWORD arguments for agents with username and password of Twitter accounts
- **(optional)** turn off headless mode for visual showcase of agent actions
```
$ node index.js
```
