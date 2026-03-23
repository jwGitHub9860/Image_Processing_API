"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// TEMP: use as test for testing PRE-RESIZED images?
routes.get('/', (req, res) => {
    res.send('Serve Pre-Resized Image');
});
exports.default = routes;
