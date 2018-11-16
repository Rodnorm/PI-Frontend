const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/PI-Frontend'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/PI-Frontend/index.html'));
});

// default Heroku port
console.log('Working');
app.listen(4200);