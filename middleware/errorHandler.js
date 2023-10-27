const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log(err.stack)
  switch(statusCode){
    case BAD_REQUEST:
      res.json({ title: "Bad Request",  message: err.message, stackTrace: err.stack });
      break;
    case UNAUTHORIZED:
      res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
      break;
    case FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
      break;
    case NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;
    case CONFLICT:
      res.json({ title: "Conflict",  message: err.message, stackTrace: err.stack });
      break;
    case SERVER_ERROR:
      res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
      break;
    default:
      console.log("No error!");
  }
};

module.exports = errorHandler;