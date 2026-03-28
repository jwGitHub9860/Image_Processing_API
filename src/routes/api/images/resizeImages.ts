// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?

import express from 'express';

const resizeImage = express.Router();

// TEMP: use as test for testing RESIZED images?
// TEMP: use Either "/" OR "/resizeImages"
resizeImage.get('/', (req, res) => {
  res.send('Resize Images API');
});

export default resizeImage;
