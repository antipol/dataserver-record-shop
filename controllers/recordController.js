const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/records.json");
const db = low(adapter);

exports.showRecords = (req, res) => {
  const getAlbums = db.get("albums").value();
  res.status(200).send(getAlbums);
};

exports.addRecord = (req, res) => {
  //create new album with info entered in postman
  const newAlbum = req.body;

  //show error if artist or title is missing
  if (!newAlbum.artist || !newAlbum.title) {
    return res
      .status(400)
      .json({ message: "Please include artist and album title" });
  }

  //push new album to the json file
  db.get("albums")
    .push(newAlbum)
    .write();

  //On success, show new album in postman
  res.status(200).send(newAlbum);
};
