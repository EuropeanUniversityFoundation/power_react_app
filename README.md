# POWER React App

This is a project included in the POWER project, with the aim to create React embeddable apps.

This application is embeddable into the university websites. 
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

In alternative, if `node` is already installed in your machine, it is possible to run the project without starting a `docker` container.

Once the `node` container is accessible, you can run the following commands:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run build:widget`

Builds the app for production to the `widget` folder.\
It creates one `js` file and one `css` file, which can be used as libraries to be embedded in different websites.\

It needs `npm install` and `npm run build` to be able to work.

## Adding Custom Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By default you will have `NODE_ENV` defined for you, and any other environment variables starting with `REACT_APP_`.

Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.

## Deployment

This React app is meant to be embedded in institutions websites.

To create the embeddable app start by deploying the code:

    git clone https://github.com/EuropeanUniversityFoundation/power_react_app.git {PROJECT_ROOT} 

If `PROJECT_ROOT` is omitted the directory will be named `power_react_app`.

Then from the command line:

    cd {PROJECT_ROOT}
    npm install             # Install all the dependencies
    npm run build           # Compile the files in /src and place them into /build
    npm run build:widget    # Create `index.js` and `index.css` files and place them into /widget

The generated widget files can now be included in the website.

### Example structure

For a very simple webpage structure like the one shown below:

    .
    └── webpage
        ├── css
        │   └── style.css
        ├── index.html
        └── powerapp
            ├── index.css
            └── index.js


The HTML document must include generated widget files and an HTML element to which the application will attach:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        ...
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="powerapp/index.css" />
        <title>POWER App</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        
        <div id="power"></div>
        ...
        <script src="powerapp/index.js" type="text/javascript" />
      </body>
    </html>

