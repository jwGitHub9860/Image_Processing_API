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
exports.default = preResizedImage;
