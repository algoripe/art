const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer(app);
app.listen(port);

console.log(`Server running on port ${port}...\n> http://localhost:${port}\nPress "CTRL" + "C" to stop the server`);

app.get('/', (req, res) => {
    console.log(req.header);
    res.sendFile(path.join(__dirname, './public/views', 'app.html'));
});

