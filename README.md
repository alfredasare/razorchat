# Razorchat
Chat application created for Razor Grip assignment

# Structure
The project root contains two main folders:

### client
Contains all the frontend code

### server
Houses the backend API

The root folder also contains a package.json file which contains scripts for starting the project. You can run:

### `npm run install-client`
This installs all dependencies for the client side.

### `npm run install-server`
This installs all dependencies for the server side

### `npm run install`
This installs the dependencies of both the client and server side. It installs client side dependencies before installing the server side dependencies.


### `npm run server`
This script runs the backend server.

### `npm run client`
This runs the client side of the application.

### `npm run watch`
Runs both the backend server and the client side development server concurrently.

**Note: This operation makes use of the `&` operator which runs both `npm run server` and `npm run client` concurrently. This operator currently only
works for Unix-based systems. On Windows, an external package like `concurrently` can assist in achieving the same effect.** 


# The Stack

## Frontend
* JavaScript
* React
* Redux
* Auth0-React
* Chakra-UI
* Socketio-client

## Backend
* TypeScript
* NodeJS
* Express
* MongoDB
* Socketio
* Morgan
* Auth0

## Hosting
* The client side was hosted on Vercel
* The server was hosted on Heroku
