// Event listeners 👂
document.getElementById('min-btn').addEventListener('click', minimizeWindow);
document.getElementById('max-btn').addEventListener('click', maxWindow);
document.getElementById('close-btn').addEventListener('click', closeWindow);
function minimizeWindow() {
  let window = remote.getCurrentWindow();
  window.minimize();
}
function maxWindow() {
  let window = remote.getCurrentWindow();
  if (!window.isMaximized()) window.maximize();
  else window.unmaximize();
}
function closeWindow() {
  let window = remote.getCurrentWindow();
  window.close();
}
