import express from "express";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Accept File Parameters');
});

export default routes;