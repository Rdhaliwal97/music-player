async function preload() {
  try{
    setTheme();
    let res = await directory.findall();
    if(res.code == dbcodes.success){
      for (const doc of res.docs){
        // console.log("Logged Output: preload -> doc", doc)
        let songArr = await extractMusicFiles(doc.path);
        // console.log("Logged Output: preload -> songArr", songArr)
        parseFiles(songArr, doc.path)
      }
    }
  }catch(err){
    console.log(err);
  }
}preload();