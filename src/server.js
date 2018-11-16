
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/PI-FRONTEND'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/PI-FRONTEND/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);