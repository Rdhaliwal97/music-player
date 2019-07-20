function addSongToDisplay(metadata, songObj) {
  let audioFile= songObj.name;
  let __path = songObj.path
  let extName = path.extname(audioFile);
  let mins = parseInt(metadata.format.duration / 60);
  let totalseconds = parseInt(metadata.format.duration % 60);
  if (totalseconds < 10) totalseconds = "0" + totalseconds;
  let title = (metadata.common.title)
    ?metadata.common.title
    :path.posix.basename(path.basename(audioFile), extName)
  let artist = (metadata.common.artist)
    ?metadata.common.artist
    : 'Unknown artist';
  let album = (metadata.common.album)
    ?metadata.common.album
    : 'Unknown album'
  songList.innerHTML += `<div class='song' data-id='' data-song-index='${songIndex}' data-duration='${metadata.format.duration}' data-song-path='${__path}'>
      <songName>${title}</songName>
      <artist>${artist}</artist>
      <album>${album}</album>
      <duration>${mins}:${totalseconds}</duration>
    </div>`
    songIndex++;
}
function setTheme(themeName = 'light') {
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
  if(songSrc){
    playSong(songSrc);
    let __songIndex = target.getAttribute('data-song-index');
    playPauseElement.setAttribute('data-song-index', __songIndex);
  }
});
//
song.addEventListener("timeupdate", _ => {
  myRange.value = song.currentTime;
  let currentmins = parseInt(song.currentTime / 60);
  let currentseconds = parseInt(song.currentTime % 60);
  if (currentseconds <= 9) currentseconds = "0" + currentseconds;
  currTimeElement.textContent = `${currentmins}:${currentseconds}`;
});
shuffleElement.addEventListener('click', (event)=>{
  console.log(event.target);
});
previousElement.addEventListener('click', (event)=>{
  let currSongIndex = playPauseElement.getAttribute('data-song-index');
  if(!currSongIndex || currSongIndex == 0) console.log('first/no song');
  else{
    let prevSongIndex = parseInt(currSongIndex) - 1;
    let prevElement = document.querySelector(`[data-song-index="${prevSongIndex}"]`);
    const songSrc = prevElement.getAttribute('data-song-path');
    if(songSrc){
      playSong(songSrc);
      playPauseElement.setAttribute('data-song-index', prevSongIndex);
    }
  }
});
playPauseElement.addEventListener('click', (event)=>{
  if(playPauseElement.getAttribute('data-is-playing') == 'false'){
    let songSrc = playPauseElement.getAttribute('data-curr-song');
    let __songIndex = event.target.getAttribute('data-song-index');
    if(songSrc){
      if(song.currentTime == 0) playSong(songSrc)
      else{
        song.play();
        playPauseElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width="30px" height="30px" viewBox="0 0 8 8">
          <path d="M0 0v6h2v-6h-2zm4 0v6h2v-6h-2z" transform="translate(1 1)" />
        </svg>`;
      }
      playPauseElement.setAttribute('data-is-playing', true)
    }else if(songList.children.length > 0){
      songSrc = songList.children[0].getAttribute('data-song-path');
      playPauseElement.setAttribute('data-song-index', 0);
      playPauseElement.setAttribute('data-is-playing', true);
      playSong(songSrc);
    }else console.log('no song added to music player');
  }else{
    pauseSong();
    playPauseElement.setAttribute('data-is-playing', false);
  }
});
nextElement.addEventListener('click', (event)=>{
  let currSongIndex = playPauseElement.getAttribute('data-song-index');
  if(!currSongIndex || currSongIndex == (songIndex - 1)) console.log('last/no song');
  else{
    let nextSongIndex = parseInt(currSongIndex) + 1;
    let nextElement = document.querySelector(`[data-song-index="${nextSongIndex}"]`);
    const songSrc = nextElement.getAttribute('data-song-path');
    if(songSrc){
      playSong(songSrc);
      playPauseElement.setAttribute('data-song-index', nextSongIndex);
    }
  }
});
loopElement.addEventListener('click', (event)=>{
  (song.loop)
    ?song.loop = false
    :song.loop = true
});