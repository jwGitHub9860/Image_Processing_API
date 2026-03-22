"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Allows Access to Express Router
const express_1 = __importDefault(require("express"));
// Imports Route from "acceptFileParameters.ts" File
const acceptFileParameters_1 = __importDefault(require("../routes/api/acceptFileParameters"));
// Imports Route from "resizeImages.ts" File
const resizeImages_1 = __importDefault(require("../routes/api/resizeImages"));
// Imports Route from "servePreResizedImage.ts" File
const servePreResizedImage_1 = __importDefault(require("../routes/api/servePreResizedImage"));
// Router Object for Creating Routes
const routes = express_1.default.Router();
// Calls Router, Obtains Root Path, and Sends Response from Server of 'Main API Route'
routes.get('/', (req, res) => {
    res.send('Main API Route');
});
// Enable Use of "fileParameters", "resizeImage", and "preResizedImage" Routes
routes.use('/acceptFileParameters', acceptFileParameters_1.default);
routes.use('/resizeImages', resizeImages_1.default);
routes.use('/servePreResizedImage', servePreResizedImage_1.default);
// Exports Route & Imports it into Main File
exports.default = routes;
