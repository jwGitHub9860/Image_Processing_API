// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?

import express from 'express';
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const originalImagesDir = path.join(__dirname, 'original-images');

const fileParameters = express.Router();

// Middleware for CORS and JSON parsing
fileParameters.use(cors());
fileParameters.use(express.json());
fileParameters.use(express.urlencoded({ extended: true }));

// Configure Multer for File Storage
const storage = multer.diskStorage({
  // MUST USE "req: any", "file: any", & "cb:any"
  // Using ONLY "req", "file", & "cb" will Cause Errors
  destination: function (req: any, file: any, cb: any) {
    // Ensure "original-images" Directory Exists
    cb(null, 'original-images');
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

// File Upload Endpoint
// TEMP: Change "/upload" to "/", Current "/" is TEMPORARY
fileParameters.post('/upload', upload.single('file'), (req: any, res) => {
  // MUST DEFINE "req" As "req: any"                  (^code above)
  // Using ONLY "req, res" Will Create Error with "file" in "req.file"
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please select a File.' });
  }

  // TEMP: Current URL is TEMPORARY
  // TEMP: Leave as "http://localhost:5000/${file.filename}"?
  // TEMP: Change to "http://localhost:5000/api/images/${file.filename}"?
  const url = `http://localhost:5000/${file.filename}`;

  // Store File Path with Original Filename as Key
  db.set(file.filename, file.path);

  res.json({
    message: 'File uploaded successfully.',
    url: url,
  });
});

// In-memory Storage for File Paths
const db = new Map();
const processed = new Map();

// Ensure Transform-Image Directory Exists
const transformedDir = path.join(__dirname, 'transform-image');
if (!fs.existsSync(transformedDir)) {
  fs.mkdirSync(transformedDir);
}

// TEMP: Used to be "/images/:filename"
fileParameters.get('/images', async (req, res) => {
  // TEMP: did Not have "as string"
  //const filename = req.params.filename as string;

  // TEMP: used to be "const { filename, h, w, f, q } = req.query"
  // Cleaner SAFER version, Better than "const { filename, h, w, f, q } = req.query"
  const filename = req.query.filename as string;
  const h = req.query.h as string;
  const w = req.query.w as string;
  const f = req.query.f as string;
  const q = req.query.q as string;

  // Sends Response IMMEDIATELY & Exits
  //res.send(req.query);

  // TEMP: used to be "!filePath"
  if (!filename) {
    // Displays Error Response, HTTP Status Code 404 (not found)
    return res
      .status(404)
      .send(
        'The following error occured processing your image remedy and try again: Error: Input file is missing',
      );
  }

  // TEMP: used to be "const filePath = db.get(filename)"
  // TEMP: used to be ABOVE "const { filename, h, w, f, q } = req.query"
  const filePath = path.join(originalImagesDir, filename as string);

  // TEMP: was not Originally here
  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: 'File not found' });
  }

  // Generate Unique Key for Processed Image Based on Parameters
  // TEMP: Change "formateUrl" Back to "http://localhost:5000/${filename}?h=${h}&w=${w}&f=${f}&q=${q}"?
  // TEMP: Used to be "http://localhost:5000/api/images/${filename}?h=${h}&w=${w}&f=${f}&q=${q}"
  const formateUrl = `http://localhost:5000/api/images?filename=${filename}&h=${h}&w=${w}&f=${f}&q=${q}`;
  let editPath = processed.get(formateUrl);

  if (editPath) {
    // Serve Cached Processed Image if it Exists
    return res.sendFile(path.resolve(editPath));
  } else if (h || w || f || q) {
    // Process Image if Resizing or Format/Quality Adjustments are Specified
    editPath = await processImage(filePath, h, w, f, q);
    if (editPath) {
      processed.set(formateUrl, editPath);
      return res.sendFile(path.resolve(editPath));
    }
  }

  // Serve Original File if No Processing is Required
  res.sendFile(path.resolve(filePath));
});

// TEMP: Keep "filePath" as "string" or "any"
// MUST USE "filePath: any, h: any, w: any, f: any, q: any"
// Using UNDEFINED "h, w, f, q" Will Causes Errors
async function processImage(filePath: any, h: any, w: any, f: any, q: any) {
  try {
    const transformer = sharp(filePath);

    // Apply Resizing Only if "h" or "w" is Provided
    // MUST DEFINE "resizeOptions" as "any"
    // Using Undefined "resizeOptions" Will Create Error with "resizeOptions.height" & "resizeOptions.width"
    const resizeOptions: any = {};
    resizeOptions.height = h ? parseInt(h) : undefined;
    resizeOptions.width = w ? parseInt(w) : undefined;
    if (Object.keys(resizeOptions).length > 0) {
      transformer.resize(resizeOptions);
    }

    // Apply Format Conversion if "f" is Provided & Supported
    if (f) {
      switch ((f as string).toLowerCase()) {
        case 'jpeg':
          break;
        case 'jpg':
          transformer.jpeg({ quality: q ? parseInt(q) : 80 });
          break;
        case 'png':
          transformer.png({ quality: q ? parseInt(q) : 80 });
          break;
        case 'webp':
          transformer.webp({ quality: q ? parseInt(q) : 80 });
          break;
        case 'gif':
          // GIF Format Doesn't Support Quality Adjustment
          transformer.gif();
          break;
        case 'tiff':
          transformer.tiff({ quality: q ? parseInt(q) : 80 });
          break;
        case 'avif':
          transformer.avif({ quality: q ? parseInt(q) : 80 });
          break;
        default:
          throw new Error('Unsupported format');
          break;
      }
    }

    // Save Processed File to "transform-image" Directory
    const extension = f ? `.${f}` : path.extname(filePath);
    const processedFilePath = path.join(
      transformedDir,
      `processed-${Date.now()}${extension}`,
    );
    await transformer.toFile(processedFilePath);
    return processedFilePath;
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

export default fileParameters;
