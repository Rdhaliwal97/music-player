// Event listeners 👂
document.querySelector('#addDirectory').addEventListener('click',addDirectory);
document.getElementById("settings").addEventListener("click", openSettings);
myRange.addEventListener("input", function() {
  song.currentTime = this.value;
}, false);
//
const extFilter = 'mp3'
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
  if(exportDirArr){
    for (const exportDir of exportDirArr) {
      let res = await directory.add(exportDir);
      if(res.code == dbcodes.success) console.log('success');
      else console.log('failure');
    }
  }
}
//
function extension(element) {
  let extName = path.extname(element);
  return extName === '.mp3';
}
//
async function extractMusicFiles(__dir) {
  let res = await fse.readdir(__dir);
  let songArr = [];
  res.filter(extension).forEach(element => {
    songArr.push(element);
  });
  return songArr;
}
//
async function parseFiles(audioFiles, __path) {
  // console.log("Logged Output: parseFiles -> audioFiles", audioFiles)
  for (const audioFile of audioFiles) {
    //takes complete path instead of file name
    const metadata = await mm.parseFile(path.resolve(__path, audioFile));
    addSongTODisplay(metadata, audioFile, __path)
  }
}
//
function openSettings() {
  // open settings
}
//
async function playSong(songSrc) {
  const metadata = await mm.parseFile(songSrc);
  song.src = songSrc;
  song.play();
  myRange.min = 0;
  myRange.value = 0;
  myRange.max = duration;
  currTimeElement.textContent = '0:00'
  playPauseElement.setAttribute('data-curr-song', songSrc);
  durationElement.textContent = `${parseInt(metadata.format.duration / 60)}:${parseInt(metadata.format.duration % 60)}`
}