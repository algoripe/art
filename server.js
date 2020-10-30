const http = require('http');
const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000;
http.createServer(server);
server.listen(port);
console.log(`Server running on port ${port}\n> http://localhost:${port}\n> Press "CTRL" + "C" to stop the server`);

// SHOULD BE ANOTHER FILE
const router = express.Router();
const sketchRoutes = require('./routes/sketch');


server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

server.use(express.static("public"));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/views', 'app.html'));
});

// ONLY THE JS FILE OF SKETCH PAGE SHOULD CHANGE
// server.get('/drawing/:drawingId', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/views', 'app.html'));
// });