const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');
const routePaths = require('./constants/routes');
const app = express();

// Allow credentials so cookies can be set from frontend.
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(routePaths.API, routes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;
