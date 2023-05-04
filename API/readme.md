# API Project Greeting sender

This tutorial will guide you through the process of installing and running an `Express.js` app that uses `mailgun-js`, `cors`, `dotenv`, and `mysql`.

## Contents

1. [Installation and Setup](#installation-and-setup)
2. [Connecting to the Database](#connecting-to-the-database)
3. [Sending Emails with Mailgun](#sending-emails-with-mailgun)
4. [Running the Server](#running-the-server)


## Installation and Setup

This will install the necessary packages for the app.

```javascript
yarn add express mysql2 dotenv mailgun-js cors
```
## Connecting to the Database

Now that you've installed the necessary dependencies, you can connect your app to the MySQL database. 

Create a new database with name 
```
greeting_app_db
```

You'll need to create a new file in your project directory called `.env`. In the `.env` file, add the following environment variables:

```text
DB_HOST=<your-db-host>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
```

## Sending Emails with Mailgun

Add the following `.env` environment variables :

```makefile
MAILGUN_API_KEY=<your-mailgun-api-key>
MAILGUN_DOMAIN=<your-mailgun-domain>
```

## Running the Server

To run an Express.js app, follow these steps:

1. Open a terminal and navigate to the root directory of your project.
2. Run the following command to start the server:

```javascript

node app.js

//or using nodemon

nodemon app.js

```
3. You should see a message in the console that says "Server listening on port 3000" (or whatever port you specified in your `app.js` file).
4. You can now access the app by opening a web browser and navigating to `http://localhost:3000` (or the appropriate URL and port number).

Note that if you make changes to your code, you'll need to stop and restart the server for the changes to take effect. You can stop the server by pressing `Ctrl + C` in the terminal where it's running.
