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
  res.send(
    'Please enter URL similar to the following example: "http://localhost:5000/api/images?filename=encenadaport&width=200&height=200". The available image filenames are the following: "encenadaport.jpg", "fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", and "santamonica.jpg".',
  );
});

// Enable Use of "fileParameters", "resizeImage", and "preResizedImage" Routes
routes.use('/', fileParameters);
routes.use('/images/resizeImages', resizeImage);
routes.use('/images/servePreResizedImage', preResizedImage);

// Exports Route & Imports it into Main File
export default routes;
