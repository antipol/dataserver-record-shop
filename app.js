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
const { setCors } = require("./middleware/setCors");

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
app.use(setCors);

//STATIC files
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);

//Path
module.exports = app;
