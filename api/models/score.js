const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
    {
        player: {
            type: String, required: true,
            uppercase: true,
            validate: /[A-Z0-9]{3}/
        },
        score: {
            type: Number,
            required: true,
            minValue: 0
        }
    }
);

module.exports = mongoose.model('Score', ScoreSchema);