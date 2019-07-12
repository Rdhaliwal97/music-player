document.querySelector('#addDirectory').addEventListener('click',addDirectory);
document.getElementById("min-btn").addEventListener("click", minimizeWindow);
document.getElementById("max-btn").addEventListener("click",maxWindow);
document.getElementById("close-btn").addEventListener("click", closeWindow);
// document.getElementById("settings").addEventListener("click", );
//
function getDirectory(){
  return remote.dialog.showOpenDialog(null, {
    properties: ["openDirectory", 'multiSelections'],
    title: "Select music directory",
    buttonLabel: "Select Folder"
  });
}
//
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
async function addDirectory() {
  let exportDirArr = await getDirectory();
  console.log('exportDirArr :', exportDirArr);
}
//
function setTheme(themeName = 'dark') {
  /* dark || light */
  document.getElementById('themeFile').href = path.resolve('css', themeName, 'variables.css');
  document.getElementById('menu').src = path.resolve(installRootPath, 'media', 'icons', themeName, 'menu.png')
  document.getElementById('search').src = path.resolve(installRootPath, 'media', 'icons', themeName, 'search.png')
  document.getElementById('recent').src = path.resolve(installRootPath, 'media', 'icons', themeName, 'recent.png')
  document.getElementById('addDirectory').src = path.resolve(installRootPath, 'media', 'icons', themeName, 'add.png')
  document.getElementById('settings').src = path.resolve(installRootPath, 'media', 'icons', themeName, 'settings.png')
}setTheme();