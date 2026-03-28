"use strict";
// TEMP: Keep or MOVE Entire File into "index.ts" FILE in "routes" FOLDER?
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizeImage = express_1.default.Router();
// TEMP: use as test for testing RESIZED images?
// TEMP: use Either "/" OR "/resizeImages"
resizeImage.get('/', (req, res) => {
    res.send('Resize Images API');
});
exports.default = resizeImage;
