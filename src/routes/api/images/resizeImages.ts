import express from 'express';

const routes = express.Router();

// TEMP: use as test for testing RESIZED images?
routes.get('/', (req, res) => {
  res.send('Resize Images API');
});

export default routes;
