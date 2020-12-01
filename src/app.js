const express = require('express');
const compression = require('compression');
const { join } = require('path');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(compression);
app.use(express.static(join(__dirname, '..', 'public'), { maxAge: '30d' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
module.exports = app;
