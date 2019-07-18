const { remote } = require("electron"),
  path = require("path"),
  rootPath = remote.app.getPath("userData"),
  dbPath = path.resolve(rootPath, "db"),
  mm = require("music-metadata"),
  util = require("util"),
  fs = require("fs"),
  fse = require("fs-extra"),
  installRootPath = process.cwd(),
  song = new Audio(),
  songPath = [],
  songList = document.getElementById("songList"),
  currTimeElement = document.getElementById('currTime'),
  durationElement = document.getElementById('duration'),
  myRange = document.getElementById('myRange'),
  shuffleElement = document.getElementById('shuffle')
  previousElement = document.getElementById('previous')
  playPauseElement = document.getElementById('playPause')
  nextElement = document.getElementById('next')
  loopElement = document.getElementById('loop')
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