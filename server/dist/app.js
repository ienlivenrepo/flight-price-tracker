"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var router = express_1.default();
var port = 8080;
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var server = http_1.default.createServer(router);
server.listen(PORT, function () {
    console.log("Server is running http://localhost:" + PORT + "...");
});
