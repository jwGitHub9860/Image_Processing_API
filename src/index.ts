import express from 'express';

// Sets Up Server using Express
const app = express();
const port = 5000;

// Creates "get endpoint" for API route
app.get('/api', (req, res) => {
  res.send('Using API Endpoint');
});

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

export default app;
