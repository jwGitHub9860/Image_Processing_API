"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileParameters = express_1.default.Router();
// TEMP: use as test for testing images with NEW PARAMETERS?
fileParameters.get('/', (req, res) => {
    res.send('Accept File Parameters');
});
exports.default = fileParameters;
