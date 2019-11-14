const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/records.json");
const db = low(adapter);
const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord
} = require("../controllers/recordController");

//routes / endpoints for all records
router
  .route("/")
  .get(getRecords)
  .post(addRecord);

//routes / endpoints for record with specific id
router
  .route("/:id")
  .get(getRecord)
  .delete(deleteRecord)
  .put(updateRecord);

module.exports = router;
