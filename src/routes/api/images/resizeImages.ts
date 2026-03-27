import express from 'express';

const resizeImage = express.Router();

// TEMP: use as test for testing RESIZED images?
resizeImage.get('/', (req, res) => {
  res.send('Resize Images API');
});

export default resizeImage;
