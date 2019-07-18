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
  songList.innerHTML += `<div class='song' data-id='' data-duration='${metadata.format.duration}' data-song-path='${path.resolve(__path,audioFile)}'>
      <songName>${title}</songName>
      <artist>${artist}</artist>
      <album>${album}</album>
      <duration>${mins}:${totalseconds}</duration>
    </div>`
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
  const duration = target.getAttribute('data-duration')
  playSong(songSrc);
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
  console.log(event.target);
})
playPauseElement.addEventListener('click', (event)=>{
  if(event.target.getAttribute('data-is-playing') == 'false'){
    let songSrc = playPauseElement.getAttribute('data-curr-song');
    if(songSrc){
      if(songSrc == 0) playSong(songSrc);
      else song.play()
      event.target.setAttribute('data-is-playing', true)
    }else if(songList.children.length > 0){
      songSrc = songList.children[0].getAttribute('data-song-path');
      playSong(songSrc);
      event.target.setAttribute('data-is-playing', true)
    }else{
      console.log('no song added to music player');
    }
  }else{
    song.pause();
    event.target.setAttribute('data-is-playing', false)
  }
});
nextElement.addEventListener('click', (event)=>{
  console.log(event.target);
})
loopElement.addEventListener('click', (event)=>{
  console.log(event.target);
})