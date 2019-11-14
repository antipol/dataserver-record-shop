const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/records.json");
const db = low(adapter);

//show all records
exports.getRecords = (req, res) => {
  const getAlbums = db.get("records").value();
  res.status(200).send(getAlbums);
};

//show specific record (based on id)
exports.getRecord = (req, res) => {
  const { id } = req.params;
  const album = db.get("records").find({ id });
  res.status(200).send(album);
};

exports.deleteRecord = (req, res) => {
  const { id } = req.params;
  const album = db
    .get("records")
    .remove({ id })
    .write();
  res.status(200).send(album);
};

exports.updateRecord = (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const album = db
    .get("records")
    .find({ id })
    .assign(update)
    .write();
  res.status(200).send(album);
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
  db.get("records")
    .push(newAlbum)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  //On success, show new album in postman
  res.status(200).send(newAlbum);
};
