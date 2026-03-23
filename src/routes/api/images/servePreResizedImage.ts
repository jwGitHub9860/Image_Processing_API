import express from 'express';

const routes = express.Router();

// TEMP: use as test for testing PRE-RESIZED images?
routes.get('/', (req, res) => {
  res.send('Serve Pre-Resized Image');
});

export default routes;
