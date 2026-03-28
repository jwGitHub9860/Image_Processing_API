"use strict";
// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sharp = require("path");
const fs = require("fs");
const fileParameters = express_1.default.Router();
// Middleware for CORS and JSON parsing
fileParameters.use(cors());
fileParameters.use(express_1.default.json());
fileParameters.use(express_1.default.urlencoded({ extended: true }));
// Configure Multer for File Storage
const storage = multer.diskStorage({
    // MUST USE "req: any", "file: any", & "cb:any"
    // Using ONLY "req", "file", & "cb" will Cause Errors
    destination: function (req, file, cb) {
        // Ensure "original-images" Directory Exists
        cb(null, "original-images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// File Upload Endpoint
// TEMP: Change "/upload" to "/", Current "/" is TEMPORARY
fileParameters.post('/upload', upload.single('file'), (req, res) => {
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
        url: url
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
fileParameters.get('/images/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.filename;
    const { h, w, f, q } = req.query;
    const filePath = db.get(filename);
    if (!filePath) {
        return res.status(404).send({ message: 'File not found.' });
    }
    // Generate Unique Key for Processed Image Based on Parameters
    // TEMP: Change "formateUrl" Back to "http://localhost:5000/${filename}?h=${h}&w=${w}&f=${f}&q=${q}"?
    const formateUrl = `http://localhost:5000/api/images/${filename}?h=${h}&w=${w}&f=${f}&q=${q}`;
    let editPath = processed.get(formateUrl);
    if (editPath) {
        // Serve Cached Processed Image if it Exists
        return res.sendFile(path.resolve(editPath));
    }
    else if (h || w || f || q) {
        // Process Image if Resizing or Format/Quality Adjustments are Specified
        editPath = yield processImage(filePath, h, w, f, q);
        if (editPath) {
            processed.set(formateUrl, editPath);
            return res.sendFile(path.resolve(editPath));
        }
    }
    // Serve Original File if No Processing is Required
    res.sendFile(path.resolve(filePath));
}));
// TEMP: Keep "filePath" as "string" or "any"
// MUST USE "filePath: any, h: any, w: any, f: any, q: any"
// Using UNDEFINED "h, w, f, q" Will Causes Errors
function processImage(filePath, h, w, f, q) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transformer = sharp(filePath);
            // Apply Resizing Only if "h" or "w" is Provided
            // MUST DEFINE "resizeOptions" as "any"
            // Using Undefined "resizeOptions" Will Create Error with "resizeOptions.height" & "resizeOptions.width"
            const resizeOptions = {};
            resizeOptions.height = h ? parseInt(h) : undefined;
            resizeOptions.width = w ? parseInt(w) : undefined;
            if (Object.keys(resizeOptions).length > 0) {
                transformer.resize(resizeOptions);
            }
            // Apply Format Conversion if "f" is Provided & Supported
            switch (true && f.toLowerCase()) {
                case "jpeg":
                    break;
                case "jpg":
                    transformer.jpeg({ quality: q ? parseInt(q) : 80 });
                    break;
                case "png":
                    transformer.png({ quality: q ? parseInt(q) : 80 });
                    break;
                case "webp":
                    transformer.webp({ quality: q ? parseInt(q) : 80 });
                    break;
                case "gif":
                    // GIF Format Doesn't Support Quality Adjustment
                    transformer.gif();
                    break;
                case "tiff":
                    transformer.tiff({ quality: q ? parseInt(q) : 80 });
                    break;
                case "avif":
                    transformer.avif({ quality: q ? parseInt(q) : 80 });
                    break;
                default:
                    throw new Error("Unsupported format");
                    break;
            }
            // Save Processed File to "transform-image" Directory
            const extension = f ? `.${f}` : path.extname(filePath);
            const processedFilePath = path.join(transformedDir, `processed-${Date.now()}${extension}`);
            yield transformer.toFile(processedFilePath);
            return processedFilePath;
        }
        catch (error) {
            console.error('Error processing image:', error);
            return null;
        }
    });
}
// Converts Raw, URL-encoded File Path into Query String
fileParameters.get("/convert-image", (req, res) => {
    var _a;
    // Input String
    const rawPath = "C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\original-images\encenadaport.jpg";
    // Decode & Clean Path (%22 -> ", / -> \ if necessary)
    // Result: C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\original-images\encenadaport.jpg
    const decodedPath = decodeURIComponent(rawPath).replace(/"/g, '');
    // Extract Filename (Ex. encenadaport.jpg)
    const filename = (_a = decodedPath.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.').shift();
    // Construct new Query String
    const newQuery = `?filename=${filename}&width=100&height=100`;
    // Send Result (or redirect)
    // Output: ?filename=${filename}&width=100&height=100
    res.send(newQuery);
});
/*const image_collection = [
  { name: "encenadaport", url: "C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\encenadaport.jpg"},
  { name: "fjord", url: "C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\fjord.jpg"}
]

fileParameters.get('/:name', async (req, res) => {
  res.send('Accept File Parameters');
  let {file} = req.query;
  console.log("file: " + file);
  const queryTeam = req.query.query
  const category = req.query.category
  console.log("req.route.path: " + req.route.path);
  res.send(`Search Query: ${queryTeam}, Category: ${category}`);
});*/
/*fileParameters.get("/search", (req, res) => {
  const queryTeam = req.query.query;
  const category = req.query.category;

  res.send(`Search Query: ${queryTeam}, Category: ${category}`);
})*/
/*import sharp from "sharp";

const importImages = './images';   // note the removal of the trailing '/'
//const exportImages = './uploads';

fileParameters.get('/test', (req, res) => {    // note the suggested change in route name
  // note that res.send() moved to become the last promise in the chain
  const fileIn = `${importImages}/${req.query.filename}`;
  //const fileOut = `${exportImages}/${req.query.filename}`;
  // note the construction of a complete input and output file specs
  const params = {
    width: req.query.width,
    height: req.query.height,
    fit: 'contain',
    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
  };
  console.log(params);
  // return sharp(fileIn)
  //   .resize(params).toBuffer().then(data => {
  //     fs.writeFile(fileOut, data);
  //   }).then(() => {
  //     return res.send('done');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return res.status(400).send(err);
  //   });
});*/
//let myImage = new Image()
exports.default = fileParameters;
