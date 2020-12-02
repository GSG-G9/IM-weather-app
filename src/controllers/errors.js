const { join } = require('path');

const clientError = (req, res) => {
  res.status(400).sendFile(join(__dirname, '..', '..', 'public', '400.html'));
};

const serverError = (err, req, res, next) => {
  res.status(500).sendFile(join(__dirname, '..', '..', 'public', '400.html'));
};

module.exports = { clientError, serverError };
