const http = require('http');
const express = require('express');
const server = express();

const PORT = 3000;

http.createServer(server);
server.listen(PORT);