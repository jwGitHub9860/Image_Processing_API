"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Sets Up Server using Express
const app = (0, express_1.default)();
const port = 5000;
// Creates "get endpoint" for API route
app.get('/api', (req, res) => {
    res.send('Using API Endpoint');
});
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
exports.default = app;
