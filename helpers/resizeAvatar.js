const jimp = require('jimp');

async function resizeAvatar(fileDir) {
  // Read the image.
  const image = await jimp.read(fileDir);

  // Resize the image to width 250 and auto height.
  await image.resize(250, jimp.AUTO);

  // Save and overwrite the image
  await image.writeAsync(fileDir);
}

module.exports = resizeAvatar;
