"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Allows Access to Express Router
const express_1 = __importDefault(require("express"));
// Imports Route from "acceptFileParameters.ts" File
const acceptFileParameters_1 = __importDefault(require("./api/images/acceptFileParameters"));
// Imports Route from "resizeImages.ts" File
const resizeImages_1 = __importDefault(require("./api/images/resizeImages"));
// Imports Route from "servePreResizedImage.ts" File
const servePreResizedImage_1 = __importDefault(require("./api/images/servePreResizedImage"));
// Router Object for Creating Routes
const routes = express_1.default.Router();
// Calls Router, Obtains Root Path, and Sends Response from Server of 'Main API Route'
// Links to Code that Connects ALL Routes with Endpoints to Server File in "index.ts" File in "src" Folder
routes.get('/', (req, res) => {
    res.send('Main API Route');
});
// Creates "get endpoint" for "../api/images"
/*routes.get('/images', (req, res) => {
  // Displays Error Response, HTTP Status Code 404 (not found)
  return res
    .status(404)
    .send(
      'The following error occured processing your image remedy and try again: Error: Input file is missing',
    );
});*/
// Enable Use of "fileParameters", "resizeImage", and "preResizedImage" Routes
routes.use('/', acceptFileParameters_1.default);
routes.use('/images/resizeImages', resizeImages_1.default);
routes.use('/images/servePreResizedImage', servePreResizedImage_1.default);
// Exports Route & Imports it into Main File
exports.default = routes;
