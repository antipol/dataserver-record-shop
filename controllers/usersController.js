const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/records.json");
const db = low(adapter);

//get all users
exports.getUsers = (req, res, next) => {
  const users = db.get("users").value();
  res.status(201).send(users);
};

//get specific user
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  const user = db.get("users").find({ id });
  res.status(201).send(user);
};

//delete specific user
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  const user = db
    .get("users")
    .remove({ id })
    .write();
  res.status(201).send(user);
};

//update specific user
exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const user = db
    .get("users")
    .find({ id })
    .assign(dt)
    .write();
  res.status(201).send(user);
};

//add new user
exports.addUser = (req, res, next) => {
  const user = req.body;
  db.get("users")
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
  res.status(201).send(user);
};
