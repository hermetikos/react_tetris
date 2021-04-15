const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const indexRouter = require('./routes/index');
const scoreRouter = require('./routes/score');

// set up express
const app = express();
// set up DB
const dbURL = String.raw`mongodb+srv://tetrisDatabaseUser:j^50Wkmp3Wza@cluster0.zxyaj.mongodb.net/tetris?retryWrites=true&w=majority`
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

port = process.env.SERVER_PORT | 3000;

app.use(express.static(path.join(__dirname, '../app/build')));

// set up routing
app.use('/', indexRouter);
app.use('/score', scoreRouter);

app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
})