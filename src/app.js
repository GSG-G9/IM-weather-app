const express = require('express');
const compression = require('compression');
const { join } = require('path');
const { clientError, serverError } = require('./controllers/errors');
const router = require('./routers');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 5500);
app.use(compression());
app.use(express.static(join(__dirname, '..', 'public'), { maxAge: '30d' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(clientError);
app.use(serverError);

module.exports = app;
