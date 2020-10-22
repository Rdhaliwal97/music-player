async function preload() {
	try {
		setTheme();
		let res = await directory.findall();
		if (res.code == dbcodes.success) {
			for (const doc of res.docs) songPath.push(doc.path);
			let songArr = await extractMusicFiles(songPath);
			parseFiles(songArr);
		}
	} catch (err) {
		console.log(err);
	}
}
preload();
