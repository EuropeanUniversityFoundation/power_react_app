# POWER React App

This is a project included in the POWER project, with the aim to create React embeddable apps.

This is an application embeddable into the university websites. 
It displays a list of public Placement Opportunities and institution-specific Placement Opportunities on the webpage it is used on.

Technologies used: React, NPM and Docker

## Quick start with Docker

In order to test this profile with Docker, you need `docker`, `docker-compose` and `make` installed on your system. If your system meets the requirements, follow these steps:

    git clone git@github.com:EuropeanUniversityFoundation/power_react_app.git
    cd euf-base
    cp .env.example .env          # The .env file is ignored by version control
    nano .env                     # Edit the environment variables if necessary
    make up                       # Create and start the Docker containers
    make shell react              # Access a shell in the Node container

In alternative, if `node` is already installed in your machine, it's possible to run the project without starting a `docker` container.

Once the `node` container is accessible, it's possible to run the following commands:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Adding Custom Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By default you will have `NODE_ENV` defined for you, and any other environment variables starting with `REACT_APP_`.

Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.