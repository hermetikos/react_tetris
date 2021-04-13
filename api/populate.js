#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
// var Book = require('./models/book')
// var Author = require('./models/author')
// var Genre = require('./models/genre')
// var BookInstance = require('./models/bookinstance')
var Score = require('./models/score');

var mongoose = require('mongoose');
var mongoDB = String.raw`mongodb+srv://tetrisDatabaseUser:j^50Wkmp3Wza@cluster0.zxyaj.mongodb.net/tetris?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var scores = []

const scoreCreate = (player, scoreVal, cb) => {
    const scoreDetail = { player: player, score: scoreVal }

    const score = new Score(scoreDetail);

    score.save(err => {
        if (err) {
            cb(err, null);
            return;
        }
        console.log(`New Score: ${score}`);
        scores.push[score];
        cb(null, score);
    });
}

const populateScores = cb => {
    async.series([
        callback => {
            scoreCreate('BUT', 100, callback);
        },
        callback => {
            scoreCreate('AAA', 90, callback);
        },
        callback => {
            scoreCreate('TIM', 1, callback);
        },
        callback => {
            scoreCreate('LUL', 99, callback);
        },
        callback => {
            scoreCreate('3PO', 22, callback);
        }
    ],
    cb);
}

async.series([
    populateScores
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



