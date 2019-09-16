"use strict";
import express from "express";
import http from "http";
import app from "./app";
import { Config } from "./config/config";

const config: Config = require("./config/config.json");
const port = config.port;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});
