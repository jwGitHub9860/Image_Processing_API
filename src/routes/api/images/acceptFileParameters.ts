// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?

import express from 'express';

const fileParameters = express.Router();

// TEMP: use as test for testing images with NEW PARAMETERS?
fileParameters.get('/', (req, res) => {
  res.send('Accept File Parameters');
});

export default fileParameters;
