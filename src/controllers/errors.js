const serverError = (err, req, res) => {
  // res.status(500).sendFile(join(__dirname, '..', '..', 'public', '400.html'));
  const error = new Error();
  error.msg = err.msg || 'internal serever error';
  error.status = err.status || 500;
  return res.status(error.status).json({ message: error.msg });
};

module.exports = { serverError };
