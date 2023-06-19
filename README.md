# Todo App

The Todo App is a simple, web-based application built with HTML, CSS, and JavaScript. This application is designed to let you create, read, update, and delete tasks, making task management an easy and efficient process.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Make sure you have the latest version of Node.js installed on your machine. If you don't have Node.js installed, you can download it from https://nodejs.org/.

### Installation
First, clone the project to your local machine. You can do this by running the following command in your terminal:
```
git clone <repository_url>
```
Replace <repository_url> with the URL of this repository.

Navigate to the root directory of the project, which should look something like this:
```
cd <project_directory>
```
Replace <project_directory> with the name of the directory that was created when you cloned the project.

Once you're in the project's root directory, install the required npm packages using the following command:
```
npm install
```
After the installation is complete, you can run the app using the following command:
```
npm run start
```
The application should now be running on your local machine!

## Scripts
Below are the scripts available to run in this project:

`npm test`: Runs the test suite for this application using the test.js file.

`npm run stylelint`: This checks all the CSS files in the project for any linting errors.

`npm run w3c`: This validates the index.html file in the /src/app directory.

`npm run eslint`: This checks all the JS files for linting errors.

`npm run validate`: This is a comprehensive command that runs the stylelint, w3c, and eslint scripts one after the other. It will also print a message to the console once all scripts have completed successfully.

`npm run api`: This script runs the api server found in the ./src/api directory.

`npm run app`: This serves the index.html file located in the ./src/app directory on a local http server.

`npm run start`: This runs the api and app scripts concurrently. This is the script you need to run when starting the app.

### Starting the Application
As mentioned earlier, starting the application is simple. Just run the following command:

```
npm run start
```
This will start both the application server and the API server concurrently. If everything is set up correctly, you should see the application running in your default web browser.

Note: The backend is set to run on port 3000 and the frontend on 8080. If one of the ports are already in use on your machine, you may have to update the app or api to use a different port.

Happy task management!