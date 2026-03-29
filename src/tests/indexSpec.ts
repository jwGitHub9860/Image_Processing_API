// Holds Tests for "index.js" File & API Routes

// Imports "app" Object FROM "index.js" File
import app from '../index.js';

// Imports Super Tests
import supertest from 'supertest';

// Runs Endpoint Tests on "app"
// Tells "supertest" What Endpoint Tests are Running On
const request = supertest(app);

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
