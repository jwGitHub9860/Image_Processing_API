import express from 'express';

const routes = express.Router();

// Calls Router, Obtains Root Path, and Sends Response from Server of 'main API route'
routes.get('/', (req, res) => {
  res.send('main API route');
});

// Exports Route & Imports it into Main File
export default routes;
