# HTW-Ersti-Api
This is an REST-API for the Schnitzeljagd in the HTW-Ersti-App, which handles CRUD operations

# Table of contents:
- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Debugging](#debugging)
- [Deployment](#deployment)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)
- recommended: a PlanetScale DB

# Getting started
Clone the repository and install dependencies
```
cd <project_name>
npm i
```
- Create .env file in the root directory and fill in the credentials:

If you are using mysql with localhost it might look like this:
```
DATABASE_URL=mysql://root@localhost:3306/htw-ersti-app
```
If you are using PlanetScale there is an option for prisma where you can see the credential string which you can copy

Next sync the prisma schema to your DB: 
```
npx prisma db push
```

For test data you can fill the DB with:

```
npx prisma db seed
```

Finall start the service locally:
```
npm run dev
```


Finally, send requests to `http://localhost:<port>`

# Debugging
In the .vscode folder is a launch.json. Select Debug Serverless offline and set breakpoints.
The Debugger will run ```npm run debug```.

# Deployment
You may have noticed the ```vercel.json``` file. This configures the deployment for [Vercel](https://vercel.com/docs/cli).
It creates a serverless function and files in the ```/api``` directory e.g. ```/api/handler.ts``` as a handler and maps it to a route. In our case it redirects every request to our handler
