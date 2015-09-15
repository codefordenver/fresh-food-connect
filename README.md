> View this project's Kanban board for tasks here: [![Stories in Ready](https://badge.waffle.io/codefordenver/fresh-food-connect.png?label=ready&title=Ready)](https://waffle.io/codefordenver/fresh-food-connect)
[![Build Status](https://travis-ci.org/codefordenver/fresh-food-connect.svg?branch=master)](https://travis-ci.org/codefordenver/fresh-food-connect)

# Fresh Food Connect

[![Fresh Food Connect](youtube-capture.png)](https://www.youtube.com/watch?v=T2XTSZGAv5s "Fresh Food Connect")

___
This repo contains the client code for Fresh Food Connect. The server code can be found here: https://github.com/codefordenver/ffc-server

> This repo is based on largely on: [redux-react-router-async-example](http://emmenko.github.io/redux-react-router-async-example)

## Installation
You will need [Node.js](https://nodejs.org/) to run.

Install dependencies with:
```bash
npm install
```

## Development
To run a local dev server pointing to a [mock apiary server](http://docs.freshfoodconnect.apiary.io/#) run:
```bash
npm start
```

To run a dev server while running a the [server](https://github.com/codefordenver/ffc-server) on port 3000 run:
```bash
USE_LOCAL_SERVER=true npm start
```

To build static files to be served from the rails backend run:
```bash
npm run dist
```
