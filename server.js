const http = require('http');
const express = require('express');
const app = express();

const PORT = 3000;

http.createServer(app);
app.listen(PORT);

console.log(`Server running on PORT ${PORT}...\n> http://localhost:${PORT}\nPress "CTRL" + C to stop the server`);

app.get('/', (req, res) => {
    console.log(req.header);
    res.send('Algoripe');
});