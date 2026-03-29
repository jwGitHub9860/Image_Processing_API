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
const path = require("path");
const sharp = require("sharp");
const resizeImage = express_1.default.Router();
// TEMP: use as test for testing RESIZED images?
// TEMP: use Either "/" OR "/resizeImages"
resizeImage.get('/', (req, res) => {
    res.send('Resize Images API');
});
// TEMP: ChatGPT test
// Image Registry
const imagesDir = path.join(__dirname, "images", "original-images");
const imageRegistry = {
    encenadaport: path.join(imagesDir, "encenadaport.jpg"),
    fjord: path.join(imagesDir, "fjord.jpg"),
    icelandwaterfall: path.join(imagesDir, "icelandwaterfall.jpg"),
    palmtunnel: path.join(imagesDir, "palmtunnel.jpg"),
    santamonica: path.join(imagesDir, "santamonica.jpg")
};
// Helper Function for Defining Image Path
function buildImageQuery(filename, width = 100, height = 100) {
    return `?filename=${filename}&width=${width}&height=${height}`;
}
const query = buildImageQuery("encenadaport");
console.log(query);
// TEMP: Keep "filePath" as "string" or "any"
// MUST USE "filePath: any, h: any, w: any"
// Using UNDEFINED "h, w" Will Causes Errors
function processImage(filePath, h, w) {
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
            // Save Processed File to "transform-image" Directory
            // const extension = f ? `.${f}` : path.extname(filePath)
            // const processedFilePath = path.join(
            //   transformedDir,
            //   `processed-${Date.now()}${extension}`
            // );
            // await transformer.toFile(processedFilePath)
            // return processedFilePath;
        }
        catch (error) {
            console.error('Error processing image:', error);
            return null;
        }
    });
}
/*resizeImage.get('/images', async (req, res) => {
  // Extract Query Parameters
  const { filename, width, height } = req.query;
  const filePath = imageRegistry[filename];
  if (!filePath) {
    return res.status(404).send("Image Not Found");
  }
  
  // Process with Sharp
  const processed = await processImage(
    filePath,
    height,
    width
  );
  
  res.sendFile(processed || filePath);
});*/
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
exports.default = resizeImage;
