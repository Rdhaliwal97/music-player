document.querySelector('#addDirectory').addEventListener('click',addDirectory);
document.getElementById("min-btn").addEventListener("click", minimizeWindow);
document.getElementById("max-btn").addEventListener("click",maxWindow);
document.getElementById("close-btn").addEventListener("click", closeWindow);
let container = document.getElementById('mainPanel');
console.log("Logged Output: container", container)
// document.getElementById("settings").addEventListener("click", );
//
console.log(path);
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
  fs.readdir(path.resolve(installRootPath, 'songs'), (err, list)=>{
    if(err) console.log(err);
    else list.filter(extension).forEach(element => {
        songArr.push(element);
      });
  })
}extractMusicFiles();
async function parseFiles(audioFiles) {
  for (const audioFile of audioFiles) {
    // console.log("Logged Output: parseFiles -> audioFile", audioFile)
    //takes complete path instead of file name
    const metadata = await mm.parseFile(path.resolve(installRootPath, 'songs', audioFile));
    addSongTODisplay(metadata, audioFile)
  }
}
function addSongTODisplay(metadata, audioFile) {
  let extName = path.extname(audioFile);
  let mins = parseInt(metadata.format.duration / 60)
  let totalseconds = parseInt(metadata.format.duration % 60);
  if (totalseconds < 10) totalseconds = "0" + totalseconds;
  console.log(metadata);
  let title = (metadata.common.title)
    ?metadata.common.title
    :path.posix.basename(audioFile, extName)
  let artist = (metadata.common.artist)
    ?metadata.common.artist
    : 'Unknown artist';
  let album = (metadata.common.album)
    ?metadata.common.album
    : 'Unknown album'
  container.innerHTML += `<div>
      <songName>${title}</songName>
      <artist>${artist}</artist>
      <album>${album}</album>
      <duration>${mins}:${totalseconds}</duration>
    </div>`
}
setTimeout(() => {
  parseFiles(songArr);
}, 3000);
/*  main panel layout break points
  songname.....artist....album....duration
  songname.....artist....duration
  songname.....duration
*/