function addSongTODisplay(metadata, audioFile, __path) {
  let extName = path.extname(audioFile);
  let mins = parseInt(metadata.format.duration / 60);
  let totalseconds = parseInt(metadata.format.duration % 60);
  if (totalseconds < 10) totalseconds = "0" + totalseconds;
  let title = (metadata.common.title)
    ?metadata.common.title
    :path.posix.basename(audioFile, extName)
  let artist = (metadata.common.artist)
    ?metadata.common.artist
    : 'Unknown artist';
  let album = (metadata.common.album)
    ?metadata.common.album
    : 'Unknown album'
  songList.innerHTML += `<div class='song' data-duration='${metadata.format.duration}' data-song-path='${path.resolve(__path,audioFile)}'>
      <songName>${title}</songName>
      <artist>${artist}</artist>
      <album>${album}</album>
      <duration>${mins}:${totalseconds}</duration>
    </div>`
}
function setTheme(themeName = 'light') {
  /* dark || light */
  document.getElementById('themeFile').href = path.resolve('css', themeName, 'variables.css');
}
//
window.addEventListener("resize",setHeight);
window.onload = setHeight();
//
function setHeight() {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  document.getElementById('sidebar').style.height = `${windowHeight - 90}px`
  document.getElementById('mainPanel').style.height = `${windowHeight - 121}px`
  document.getElementById('songList').style.height = `${windowHeight - 191}px`
}

document.querySelector('#songList').addEventListener('click',(event)=>{
  let target = (event.target.tagName.toLowerCase() == 'div')
    ?event.target
    :event.target.parentNode
  const songSrc = target.getAttribute('data-song-path');
  let duration = target.getAttribute('data-duration')
  song.src = songSrc;
  song.play();
  myRange.min = 0;
  myRange.value = 0;
  myRange.max = duration;
  currTimeElement.textContent = '0:00'
  let mins = parseInt(duration / 60);
  let totalseconds = parseInt(duration % 60);
  durationElement.textContent = `${mins}:${totalseconds}`
});
//
song.addEventListener("timeupdate", _ => {
  myRange.value = song.currentTime;
  let currentmins = parseInt(song.currentTime / 60);
  let currentseconds = parseInt(song.currentTime % 60);
  if (currentseconds <= 9) currentseconds = "0" + currentseconds;
  currTimeElement.textContent = `${currentmins}:${currentseconds}`;
});