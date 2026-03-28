// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?

import express from 'express';

const preResizedImage = express.Router();

// TEMP: use as test for testing PRE-RESIZED images?
preResizedImage.get('/', (req, res) => {
  res.send('Serve Pre-Resized Image');
});

export default preResizedImage;
