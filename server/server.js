const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname , '../public');
var app = express();
var port = process.env.port || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port 3000`);
})