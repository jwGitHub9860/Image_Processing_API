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

// Configure Multer for File Storage
const storage = multer.diskStorage({
  // MUST USE "req: any", "file: any", & "cb:any"
  // Using ONLY "req", "file", & "cb" will Cause Errors
  destination: function(req: any, file: any, cb:any) {
    // Ensure "original-images" Directory Exists
    cb(null, "original-images")
  },
  filename: function (req: any, file: any, cb:any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// File Upload Endpoint
fileParameters.post('/upload', upload.single('file'), (req: any, res) => {
  // MUST DEFINE "req" As "req: any"                  (^code above)
  // Using Only "req, res" Will Create Error with "file" in "req.file"
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please select a File.'});
  }
  const url = `http://localhost:5000/${file.filename}`

  // Store File Path with Original Filename as Key
  db.set(file.filename, file.path)

  res.json({
    message: 'File uploaded successfully.',
    url: url
  });
});

export default fileParameters;
