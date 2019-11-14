//EXTERNAL dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/records.json");
const db = low(adapter);

//ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");
const { setCors } = require("./middleware/setCors");

//Initialize
const app = express();

//Logging
app.use(logger("dev"));

//initialise album database with lowdb
db.defaults({
  records: [],
  users: [],
  orders: []
}).write();

//REQUEST parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

//STATIC files
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

//Error handling
app.use(function(req, res, next) {
  const error = new Error("Looks like something went wrong...");
  error.status = 400;
  next(error);
});

app.use(function(err, req, res, next) {
  res.send({
    error: {
      message: err.message
    }
  });
});

//Path
module.exports = app;
