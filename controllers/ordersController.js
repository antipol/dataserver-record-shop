const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/records.json");
const db = low(adapter);

//get all orders
exports.getOrders = (req, res, next) => {
  const orders = db.get("orders").value();
  res.status(201).send(orders);
};

//get specific order
exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  const order = db.get("orders").find({ id });
  res.status(201).send(order);
};

//delete specific order
exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  const order = db
    .get("orders")
    .remove({ id })
    .write();
  res.status(201).send(order);
};

//update specific order
exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const order = db
    .get("orders")
    .find({ id })
    .assign(dt)
    .write();
  res.status(201).send(order);
};

//add new order
exports.addOrder = (req, res, next) => {
  const order = req.body;
  db.get("orders")
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
  res.status(201).send(order);
};
