function errorHandler(err, req, res, next) {

  switch (err.name) {
    case 'ValidationError':
      res.status(500).json({message : "Validation error"});
      break;
      case 'jsontokenerror':
        res.status(500).json({message : "JSontokenerror"});
        break;
        

  }
}
module.exports = errorHandler;
  