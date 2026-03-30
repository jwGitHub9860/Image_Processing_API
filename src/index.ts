import express from 'express';

// Imports Routes from "routes" Folder
import routes from './routes/index';

// Sets Up Server using Express
const app = express();
const port = 5000;

// Creates "get endpoint" for API route
app.get('/', (req, res) => {
  res.send(
    'Welcome to Image API Endpoint, please enter \"http://localhost:3000/api/\" into URL to view instructions.',
  );
});

// Connects ALL Routes with Endpoints to Server File
app.use('/api', routes);

// Starts Express Server
app.listen(port, () => {
  console.log(`Listening to ${port}`);
  console.log(`server started at http://localhost:${port}`);
});

export default app;
