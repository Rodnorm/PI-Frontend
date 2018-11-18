const path = require('path');
const express = require('express');
const app = express();

const port = normalizePort(process.env.PORT || '3000');
// Serve static files
app.use(express.static(__dirname + '/dist/PI-Frontend'));

// Send all requests to index.html
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/PI-Frontend/index.html'));
// });
  
// default Heroku port
console.log(`Frontend rodando na porta ${port}`);
app.listen(port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
