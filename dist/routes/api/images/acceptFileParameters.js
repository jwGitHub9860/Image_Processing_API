"use strict";
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
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const originalImagesDir = path.join(__dirname, 'original-images');
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
        cb(null, 'original-images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
// File Upload Endpoint
fileParameters.post('/upload', upload.single('file'), (req, res) => {
    // MUST DEFINE "req" As "req: any"                  (^code above)
    // Using ONLY "req, res" Will Create Error with "file" in "req.file"
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Please select a File.' });
    }
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
fileParameters.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // "res.send(req.query)" Sends Response IMMEDIATELY & Exits
    // Cleaner SAFER version, Better than "const { filename, h, w, f, q } = req.query"
    const filename = req.query.filename;
    const h = req.query.h;
    const w = req.query.w;
    const f = req.query.f;
    const q = req.query.q;
    // Checks if Image Filename, Height, and Width are All Present
    if (!filename && !h && !w) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Input file is missing');
    }
    else if (!filename) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image filename is missing');
    }
    else if (!h) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image height is missing');
    }
    else if (!w) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image width is missing');
    }
    else if (!filename && !h) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image filename and height are missing');
    }
    else if (!filename && !w) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image filename and width are missing');
    }
    else if (!h && !w) {
        // Displays Error Response, HTTP Status Code 404 (not found)
        return res
            .status(404)
            .send('The following error occured processing your image remedy and try again: Error: Image height and width are missing');
    }
    const filePath = path.join(originalImagesDir, filename);
    // Checks if File ALREADY EXISTS
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: 'File not found' });
    }
    // Generate Unique Key for Processed Image Based on Parameters
    const formateUrl = `http://localhost:5000/api/images?filename=${filename}&h=${h}&w=${w}&f=${f}&q=${q}`;
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
            if (f) {
                switch (f.toLowerCase()) {
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
exports.default = fileParameters;
