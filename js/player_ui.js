function addSongTODisplay(metadata, audioFile) {
  console.log(audioFile)
  let extName = path.extname(audioFile);
  let mins = parseInt(metadata.format.duration / 60)
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
  songList.innerHTML += `<div class='song'>
      <songName>${title}</songName>
      <artist>${artist}</artist>
      <album>${album}</album>
      <duration>${mins}:${totalseconds}</duration>
    </div>`
}
function setTheme(themeName = 'light') {
  /* dark || light */
  document.getElementById('themeFile').href = path.resolve('css', themeName, 'variables.css');
}setTheme();