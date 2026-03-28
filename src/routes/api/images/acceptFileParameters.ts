// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?

import express from 'express';
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const sharp = require("path")
const fs = require("fs");

const fileParameters = express.Router();

// Middleware for CORS and JSON parsing
fileParameters.use(cors())
fileParameters.use(express.json())
fileParameters.use(express.urlencoded({ extended: true }))

// TEMP: use as test for testing images with NEW PARAMETERS?
// TEMP: use Either "/" OR "/acceptFileParameters"
fileParameters.get('/', (req, res) => {
  res.send('Accept File Parameters');
});

export default fileParameters;
