# MySeedProject
[//]: # (TODO add github forking cheatsheet Travis setup and usage and Greenkeeper setup and usage)



## Developing the app on local machine

## Git and Github
When working on a future create a branch.
Do not forget to write clear commit messages. When the work on that branch is done, 

### Using WebStorm
[//]: # (TODO add installation guide)


- Setup the debug configuration using `Edit configurations...` add configuration using `JavaScript Debug`, no further config should be needed.  
- Similarly setup the Karma configuration using the build in WebStorm run configuration, choose `karma.conf.js` in the project root.  
- Run the server via `npm start`. Then run the debug config. If needed run tests directly from WebStorm.

## Firebase setup
AngularFire configuration is inside `environments/environment.*.ts` files. Auth service uses FirebaseAuth. Firestore is designed to be used across the whole app.

## Raven and Sentry setup and usage
In `app.module.ts` modify the config of Raven to operate the right Sentry account. In `dev` environment errors are thrown, in `prod` environment errors are caught using Raven and send to Sentry.

## Angular CLI commands
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

**Development server**

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**Code scaffolding**

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

**Build**

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

**Running unit tests**

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

**Running end-to-end tests**

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**Further help**

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
