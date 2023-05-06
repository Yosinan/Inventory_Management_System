function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
  
    if (err.code === 'ERR_HTTP_HEADERS_SENT') {
      // Handle the error
      res.status(500).json({ error: 'Cannot set headers after they are sent to the client' });
    } else {
      next(err);
    }
  }

module.exports = errorHandler;
  