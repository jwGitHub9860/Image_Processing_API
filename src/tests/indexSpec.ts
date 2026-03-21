// Holds Tests for "index.js" File & API Routes

// Imports "app" Object FROM "index.ts" File
import app from '../index';

// Allows Access to Express Router
import express from 'express';

// Imports Route from "acceptFileParameters.ts" File
import fileParameters from '../routes/api/acceptFileParameters';

// Imports Route from "resizeImages.ts" File
import resizeImage from '../routes/api/resizeImages';

// Imports Route from "servePreResizedImage.ts" File
import preResizedImage from '../routes/api/servePreResizedImage';

// Imports Super Tests
import supertest from 'supertest';

// Runs Endpoint Tests on "app"
// Tells "supertest" What Endpoint Tests are Running On
const request = supertest(app);

// Router Object for Creating Routes
const routes = express.Router();

// Test for API Endpoint (suite)
describe('Test endpoint responses', () => {
  // Endpoint Tests are ALWAYS Asynchronous
  it('gets API Endpoint', async () => {
    // Creates Response that Awaits Super Test Request and Obtains Endpoint API
    const response = await request.get('/api');

    // Returns Status 200 when Accessed in Browser
    // Expect Statement that Checks if Response Status is 200 (HTTP Status Code for "okay", Test Passes)
    expect(response.status).toBe(200);
  });
});

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
