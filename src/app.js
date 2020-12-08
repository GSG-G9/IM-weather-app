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

app.use('/api/v1', router);
app.use((req, res) => res.status(404).sendFile(join(__dirname, '..', 'public', '404.html')));

module.exports = app;
