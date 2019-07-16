// Event listeners 👂
document.getElementById("min-btn").addEventListener("click", minimizeWindow);
document.getElementById("max-btn").addEventListener("click",maxWindow);
document.getElementById("close-btn").addEventListener("click", closeWindow);
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
/*  main panel layout break points
  songname.....artist....album....duration
  songname.....artist....duration
  songname.....duration
*/
window.addEventListener("resize",setHeight);
window.onload = setHeight();
//
function setHeight() {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  // console.log("window width -> ", windowWidth)
}