// Event listeners 👂
document.querySelector('#addDirectory').addEventListener('click',addDirectory);
document.getElementById("settings").addEventListener("click", openSettings);
//
const extFilter = 'mp3'
let songArr = [];
//
function extension(element) {
  let extName = path.extname(element);
  return extName === '.' + extFilter;
}
//
function getDirectory(){
  return remote.dialog.showOpenDialog(null, {
    properties: ["openDirectory", 'multiSelections'],
    title: "Select music directory",
    buttonLabel: "Select Folder"
  });
}
//
async function addDirectory() {
  let exportDirArr = await getDirectory();
  console.log('exportDirArr :', exportDirArr);
  for (const exportDir of exportDirArr) {
    let res = await directory.add(exportDir);
    console.log("Logged Output: addDirectory -> res", res)
    if(res.code == dbcodes.success) console.log('success');
    else console.log('failure');
  }
}
//
function extractMusicFiles() {
  fs.readdir(path.resolve(installRootPath, 'songs'), (err, list)=>{
    if(err) console.log(err);
    else list.filter(extension).forEach(element => {
        songArr.push(element);
      });
  })
}
//
parseFiles(songArr)
//
async function parseFiles(audioFiles) {
  for (const audioFile of audioFiles) {
    //takes complete path instead of file name
    const metadata = await mm.parseFile(path.resolve(installRootPath, 'songs', audioFile));
    addSongTODisplay(metadata, audioFile)
  }
}
/* test call */
setTimeout(() => {
  parseFiles(songArr);
}, 3000);
//
function openSettings() {
  //
}
// document.querySelector('#songList').addEventListener('click',(event)=>{
//   console.log(event.target);
// })