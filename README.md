# Serverless Express Typescript Template

# Table of contents:

- [Serverless Express Typescript Template](#serverless-express-typescript-template)
- [Table of contents:](#table-of-contents)
- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Debugging](#debugging)


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Serverless CLI](https://www.serverless.com/framework/docs/getting-started)
```
npm install -g serverless
```
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
- Install dependencies
```
cd <project_name>
npm i
```
- Create .env file in the root directory and fill in the credentials:
```
DB_HOST=""
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
PRIVATE_KEY=""
PUBLIC_KEY=""
```
- Create some code in the ```app.ts``` file, create some controllers etc.
- Start the Service (this sets the local port to 3000)
```
npm run dev
```
- To change the port run
```
serverless offline start -s DEV --reloadHandler --httpPort <port>
```

Finally, send requests to `http://localhost:<port>`

# Debugging
In the .vscode folder is a launch.json. Select Debug Serverless offline and set breakpoints.
The Debugger will run ```npm run debug```.
If your OS is Windows Vscode will detect it and will run ```npm run debug:win```
