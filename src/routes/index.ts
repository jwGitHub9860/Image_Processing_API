// Allows Access to Express Router
import express from 'express';

// Imports Route from "acceptFileParameters.ts" File
import fileParameters from './api/images/acceptFileParameters';

// Imports Route from "resizeImages.ts" File
import resizeImage from './api/images/resizeImages';

// Imports Route from "servePreResizedImage.ts" File
import preResizedImage from './api/images/servePreResizedImage';

// Router Object for Creating Routes
const routes = express.Router();

// Calls Router, Obtains Root Path, and Sends Response from Server of 'Main API Route'
// Links to Code that Connects ALL Routes with Endpoints to Server File in "index.ts" File in "src" Folder
routes.get('/', (req, res) => {
  res.send('Main API Route');
});

// Creates "get endpoint" for "../api/images"
routes.get('/images', (req, res) => {
  // Displays Error Response, HTTP Status Code 404 (not found)
  return res
    .status(404)
    .send(
      'The following error occured processing your image remedy and try again: Error: Input file is missing',
    );
});

// Enable Use of "fileParameters", "resizeImage", and "preResizedImage" Routes
routes.use('/images', fileParameters);
routes.use('/images/resizeImages', resizeImage);
routes.use('/images/servePreResizedImage', preResizedImage);

// Exports Route & Imports it into Main File
export default routes;
