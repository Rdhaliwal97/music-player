const { remote } = require("electron");

document.getElementById("min-btn").addEventListener("click", function(e) {
  console.log('this');
  let window = remote.getCurrentWindow();
  window.minimize();
});

document.getElementById("max-btn").addEventListener("click", function(e) {
  let window = remote.getCurrentWindow();
  if (!window.isMaximized()) window.maximize();
  else window.unmaximize();
});

document.getElementById("close-btn").addEventListener("click", function(e) {
  let window = remote.getCurrentWindow();
  window.close();
});