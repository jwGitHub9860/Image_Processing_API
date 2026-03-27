import express from 'express';

const fileParameters = express.Router();

// TEMP: use as test for testing images with NEW PARAMETERS?
fileParameters.get('/', (req, res) => {
  res.send('Accept File Parameters');
});

export default fileParameters;
