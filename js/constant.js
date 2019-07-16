const { remote } = require("electron");
const editJsonFile = require("edit-json-file");
const path = require('path');
const rootPath = remote.app.getPath('userData');
console.log("Logged Output: rootPath", rootPath)
const dbPath = path.resolve(rootPath, 'db');
const mm = require('music-metadata');
const util = require('util');
const fs = require('fs');
const installRootPath = process.cwd();
const songList = document.getElementById('songList');
const dbcodes = {
  error: 'error',
  empty: 'empty',
  exist: 'exist',
  success: 'success'
}