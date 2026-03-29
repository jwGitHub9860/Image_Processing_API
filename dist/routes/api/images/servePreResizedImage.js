"use strict";
// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preResizedImage = express_1.default.Router();
// TEMP: use as test for testing PRE-RESIZED images?
// TEMP: use Either "/" OR "/servePreResizedImage"
preResizedImage.get('/', (req, res) => {
    res.send('Serve Pre-Resized Image');
});
// temp: SUCCESSFUL
// Converts Raw, URL-encoded File Path into Query String
// GET Endpoint: /convert-image
/*fileParameters.get("/convert-image/", (req, res) => {
  // Input String
  const rawPath = "C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\original-images\encenadaport.jpg";

  // Decode & Clean Path (%22 -> ", / -> \ if necessary)
  // Result: C:\Users\jwori\GitHub\Image_Processing_API\src\routes\api\images\original-images\encenadaport.jpg
  const decodedPath = decodeURIComponent(rawPath).replace(/"/g, '');

  // Extract Filename (Ex. encenadaport.jpg)
  const filename = decodedPath.split('/').pop()?.split('.').shift();

  // Construct new Query String
  const newQuery = `?filename=${filename}&width=100&height=100`;

  // Send Result (or redirect)
  // Output: ?filename=${filename}&width=100&height=100
  res.send(newQuery);
})*/
exports.default = preResizedImage;
