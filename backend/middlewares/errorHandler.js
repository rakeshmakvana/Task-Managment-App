const errorHandler = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
};

export default errorHandler;
