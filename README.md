# Vibiio Angular 2 Web Client App

Documentation can be found in [*Asana*](https://app.asana.com/0/293243103762528/board).

## Development

### Prerequisites
You must have Node 6.9.0 or higher AND NPM v3.0 or higher; Yarn, angular CLI 
installed:

* [Install Yarn](https://yarnpkg.com/en/docs/install)
* `npm install -g @angular/cli` - To install the angular CLI

### First time use
After cloning the repo:

* `ng set --global packageManager=yarn` - Configure Angular CLI to use Yarn for 
package management.
* `yarn install` - install dependencies.

### Development server
* `ng serve` - To run servier Navigate to [http://localhost:4200](http://localhost:4200)
* `ng serve --port NUMBER` -  to change the port number of development server
* `ng serve --environment [ENVIRONMENT NAME]` to run server for specific environments 

### Build
* `ng build` - to build the project. The build artifacts will be stored in 
the `dist/` directory. Use the `-prod` flag for a production build. 
For other environments use `ng build --environment [ENVIRONMENT NAME]`. 
Note: additional environments must be registered in the .angular-cli.json 
file under `environments`.

### Running unit tests
* `ng test` - to run the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Before running the tests make sure you are serving the app via `ng serve`.

* `ng e2e` - to run the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Deployment
* Deployments to staging are automaticly made from the master branch.

### Changelog
* [CHANGELOG](https://github.com/TrimAgency/vibiio-client-app/blob/master/CHANGELOG.md)

### API Repo
* [Vibiio Rails API](https://github.com/TrimAgency/vibiio-api)
