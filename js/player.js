// Event listeners 👂
document.querySelector("#addDirectory").addEventListener("click", addDirectory);
document.getElementById("settings").addEventListener("click", openSettings);
myRange.addEventListener(
  "input",
  function() {
    song.currentTime = this.value;
  },
  false
);
//
const extFilter = "mp3";
//
function getDirectory() {
  return remote.dialog.showOpenDialog(null, {
    properties: ["openDirectory", "multiSelections"],
    title: "Select music directory",
    buttonLabel: "Select Folder"
  });
}
//
async function addDirectory() {
  let exportDirArr = await getDirectory();
  if (exportDirArr) {
    let pathArr = [];
    for (const exportDir of exportDirArr) {
      let res = await directory.add(exportDir);
      if (res.code == dbcodes.success) pathArr.push(exportDir)
      else console.log("failure");
    }
    let songArr = await extractMusicFiles(pathArr);
    parseFiles(songArr);
  }
}
//
function extension(element) {
  let extName = path.extname(element);
  return extName === ".mp3";
}
//
// let songArr = []
async function extractMusicFiles(__pathArr) {
  let songArr = [];
  for (const __path of __pathArr) {
    let res = await fse.readdir(__path);
    res.filter(extension).forEach(element => {
      songArr.push({ name: element, path: path.resolve(__path, element) });
    });
  }
  songArr.sort(function (a, b) {
    if(a.name > b.name) return 1
    else if(a.name < b.name) return -1
    else return 0
  })
  return songArr;
}
//
async function parseFiles(audioFiles) {
  for (const audioFile of audioFiles) {
    //takes complete path instead of file name
    const metadata = await mm.parseFile(audioFile.path);
    addSongToDisplay(metadata, audioFile);
  }
}
//
function openSettings() {
  // open settings
}
//
async function playSong(songSrc) {
  const metadata = await mm.parseFile(songSrc);
  let duration = metadata.format.duration;
  song.src = songSrc;
  song.play();
  playPauseElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="30px" height="30px" viewBox="0 0 8 8">
    <path d="M0 0v6h2v-6h-2zm4 0v6h2v-6h-2z" transform="translate(1 1)" />
  </svg>`;
  myRange.min = 0;
  myRange.value = 0;
  myRange.max = duration;
  currTimeElement.textContent = "0:00";
  playPauseElement.setAttribute("data-curr-song", songSrc);
  let mins = parseInt(duration / 60);
  let seconds = parseInt(duration % 60);
  if (seconds <= 9) seconds = "0" + seconds;
  durationElement.textContent = `${mins}:${seconds}`;
}
//
function pauseSong() {
  song.pause();
  playPauseElement.innerHTML = `<svg data-is-playing='false' version="1.1" height='30px' width='30px' fill='#ffffff' viewBox="0 0 92 92">
      <path d="M69.5,42.9l-42-33c-1.2-0.9-2.8-1.1-4.2-0.5C21.9,10.1,21,11.5,21,13v66c0,1.5,0.9,2.9,2.3,3.6 c0.6,0.3,1.2,0.4,1.7,0.4c0.9,0,1.8-0.3,2.5-0.9l42-33c1-0.8,1.5-1.9,1.5-3.1S70.4,43.6,69.5,42.9z M29,70.8V21.2L60.5,46L29,70.8z" />
    </svg>`;
}
