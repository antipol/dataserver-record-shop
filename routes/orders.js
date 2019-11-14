const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/records.json");
const db = low(adapter);
const {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  addOrder
} = require("../controllers/ordersController");

//t get or add order
router
  .route("/")
  .get(getOrders)
  .post(addOrder);

//to get specific order or delete specific order or update specific order
router
  .route("/:id")
  .get(getOrder)
  .delete(deleteOrder)
  .put(updateOrder);

module.exports = router;
