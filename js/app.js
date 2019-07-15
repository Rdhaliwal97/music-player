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
function setTheme(themeName = 'light') {
  /* dark || light */
  document.getElementById('themeFile').href = path.resolve('css', themeName, 'variables.css');
}setTheme();
//
const extFilter = 'mp3'
let songArr = [];
function extension(element) {
  let extName = path.extname(element);
  return extName === '.' + extFilter;
}
function extractMusicFiles() {
  fs.readdir(installRootPath, (err, list)=>{
    if(err) console.log(err);
    else list.filter(extension).forEach(element => {
        songArr.push(element);
      });
  })
}extractMusicFiles();
async function parseFiles(audioFiles) {
  for (const audioFile of audioFiles) {
    const metadata = await mm.parseFile(audioFile);
  }
}
setTimeout(() => {
  parseFiles(songArr);
}, 3000);