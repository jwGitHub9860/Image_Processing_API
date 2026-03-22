// Allows Access to Express Router
import express from 'express';

// Imports Route from "acceptFileParameters.ts" File
import fileParameters from '../routes/api/acceptFileParameters';

// Imports Route from "resizeImages.ts" File
import resizeImage from '../routes/api/resizeImages';

// Imports Route from "servePreResizedImage.ts" File
import preResizedImage from '../routes/api/servePreResizedImage';

// Router Object for Creating Routes
const routes = express.Router();

// Calls Router, Obtains Root Path, and Sends Response from Server of 'Main API Route'
routes.get('/', (req, res) => {
  res.send('Main API Route');
});

// Enable Use of "fileParameters", "resizeImage", and "preResizedImage" Routes
routes.use('/acceptFileParameters', fileParameters);
routes.use('/resizeImages', resizeImage);
routes.use('/servePreResizedImage', preResizedImage);

// Exports Route & Imports it into Main File
export default routes;
