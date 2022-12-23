const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors')

// Serve the static files from the React app
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/pulkit',(req,res)=>{
    res.send("Pulkit Resides here. Come back any time.")
})
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);