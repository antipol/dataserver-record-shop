exports.setCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://www.google.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Accept, Origin"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  //use next since header is CORS middleware
  next();
};
