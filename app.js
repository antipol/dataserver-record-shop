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
const recordsRouter = require("./routes/records");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//Initialize
const app = express();

//initialise album database with lowdb
db.defaults({
  albums: []
}).write();

//Logging
app.use(logger("dev"));

//REQUEST parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//STATIC files
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/records", recordsRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

//Path
module.exports = app;
