const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

// set up express
const app = express();
// set up DB
const dbURL = String.raw`mongodb+srv://tetrisDatabaseUser:j^50Wkmp3Wza@cluster0.zxyaj.mongodb.net/tetris?retryWrites=true&w=majority`
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

port = process.env.SERVER_PORT | 3000;

app.use(express.static(path.join(__dirname, '../app/build')));

// the default action should be to return the UI
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
})