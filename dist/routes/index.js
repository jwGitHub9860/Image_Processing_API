"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// Calls Router, Obtains Root Path, and Sends Response from Server of 'main API route'
routes.get('/', (req, res) => {
    res.send('main API route');
});
// Exports Route & Imports it into Main File
exports.default = routes;
