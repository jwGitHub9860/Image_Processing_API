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
// TEMP: Change "/upload" to "/", Current "/" is TEMPORARY
fileParameters.post('/upload', upload.single('file'), (req: any, res) => {
  // MUST DEFINE "req" As "req: any"                  (^code above)
  // Using ONLY "req, res" Will Create Error with "file" in "req.file"
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please select a File.'});
  }
  // TEMP: Change to "http://localhost:5000/api/images/${file.filename}", Current URL is TEMPORARY
  const url = `http://localhost:5000/api/images/upload/${file.filename}`

  // Store File Path with Original Filename as Key
  db.set(file.filename, file.path)

  res.json({
    message: 'File uploaded successfully.',
    url: url
  });
});

// In-memory Storage for File Paths
const db = new Map();
const processed = new Map();

// Ensure Transform-Image Directory Exists
const transformedDir = path.join(__dirname, 'transform-image');
if (!fs.existsSync(transformedDir)) {
  fs.mkdirSync(transformedDir)
}

fileParameters.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  const { h, w, f, q } = req.query;
  const filePath = db.get(filename);
  
  if (!filePath) {
    return res.status(404).send({ message: 'File not found.' });
  }
  
  // Generate Unique Key for Processed Image Based on Parameters
  const formateUrl = `http://localhost:5000/${filename}?h=${h}&w=${w}&f=${f}&q=${q}`
  let editPath = processed.get(formateUrl);

  if (editPath) {
    // Serve Cached Processed Image if it Exists
    return res.sendFile(path.resolve(editPath));
  } else if (h || w || f || q) {
    // Process Image if Resizing or Format/Quality Adjustments are Specified
    editPath = await processImage(filePath, h, w, f, q);
    if (editPath) {
      processed.set(formateUrl, editPath);
      return res.sendFile(path.resolve(editPath))
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
      transformer.resize(resizeOptions)
    }

    // Apply Format Conversion if "f" is Provided & Supported
    switch (true && f.toLowerCase()) {
      case "jpeg":
        break
      case "jpg":
        transformer.jpeg({ quality: q ? parseInt(q) : 80 });
        break
      case "png":
        transformer.png({ quality: q ? parseInt(q) : 80 });
        break
      case "webp":
        transformer.webp({ quality: q ? parseInt(q) : 80 });
        break
      case "gif":
        // GIF Format Doesn't Support Quality Adjustment
        transformer.gif();
        break;
      case "tiff":
        transformer.tiff({ quality: q ? parseInt(q) : 80 });
        break
      case "avif":
        transformer.avif({ quality: q ? parseInt(q) : 80 });
        break;
      default:
        throw new Error("Unsupported format");
        break;
    }

    // Save Processed File to "transform-image" Directory
    const extension = f ? `.${f}` : path.extname(filePath)
    const processedFilePath = path.join(
      transformedDir,
      `processed-${Date.now()}${extension}`
    );
    await transformer.toFile(processedFilePath)
    return processedFilePath;
  } catch (error) {
    console.error('Error processing image:', error)
    return null
  }
}

export default fileParameters;
