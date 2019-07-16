const { remote } = require("electron"),
  editJsonFile = require("edit-json-file"),
  path = require("path"),
  rootPath = remote.app.getPath("userData"),
  dbPath = path.resolve(rootPath, "db"),
  mm = require("music-metadata"),
  util = require("util"),
  fs = require("fs"),
  fse = require("fs-extra"),
  song = new Audio(),
  installRootPath = process.cwd(),
  songList = document.getElementById("songList"),
  dbcodes = {
    error: "error",
    empty: "empty",
    exist: "exist",
    success: "success"
  },
  Datastore = require("nedb"),
  directoryDb = new Datastore({
    filename: path.resolve(dbPath, "driectory.db"),
    autoload: true
  }),
  recentDb = new Datastore({
    filename: path.resolve(dbPath, "recent.db"),
    autoload: true
  });