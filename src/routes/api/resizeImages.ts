import express from "express"

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Resize Images API');
});

export default routes;