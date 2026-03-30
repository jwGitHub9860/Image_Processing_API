"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Imports Routes from "routes" Folder
const index_1 = __importDefault(require("./routes/index"));
// Sets Up Server using Express
const app = (0, express_1.default)();
const port = 5000;
// Creates "get endpoint" for API route
app.get('/', (req, res) => {
    res.send('Welcome to Image API Endpoint, please enter \"http://localhost:3000/api/\" into URL to view instructions.');
});
// Connects ALL Routes with Endpoints to Server File
app.use('/api', index_1.default);
// Starts Express Server
app.listen(port, () => {
    console.log(`Listening to ${port}`);
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
