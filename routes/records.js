const express = require("express");
const router = express.Router();
const { showRecords, addRecord } = require("../controllers/recordController");

//set up root folder to be /records
router.get("/", showRecords);

router.post("/", addRecord);

module.exports = router;
