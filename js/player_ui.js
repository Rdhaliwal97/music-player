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
  songList.innerHTML += `<div class='song' data-song-path='${path.resolve(__path,audioFile)}'>
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
  song.src = songSrc;
  song.play();
})