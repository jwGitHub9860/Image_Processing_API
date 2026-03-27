import express from 'express';

const routes = express.Router();

// TEMP: use as test for testing images with NEW PARAMETERS?
routes.get('/', (req, res) => {
  res.send('Accept File Parameters');
});

export default routes;
