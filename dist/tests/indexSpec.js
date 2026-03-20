"use strict";
// Tests for "index.js" File
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports "app" Object FROM "index.ts" Fi
const index_1 = __importDefault(require("../index"));
// Imports Super Tests
const supertest_1 = __importDefault(require("supertest"));
// Runs Endpoint Tests on "app"
// Tells "supertest" What Endpoint Tests are Running On
const request = (0, supertest_1.default)(index_1.default);
// Test for API Endpoint (suite)
describe("Test endpoint responses", () => {
    // Endpoint Tests are ALWAYS Asynchronous
    it('gets API Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        // Creates Response that Awaits Super Test Request and Obtains Endpoint API
        const response = yield request.get('/api');
        // Returns Status 200 when Accessed in Browser
        // Expect Statement that Checks if Response Status is 200 (HTTP Status Code for "okay", Test Passes)
        expect(response.status).toBe(200);
    }));
});
