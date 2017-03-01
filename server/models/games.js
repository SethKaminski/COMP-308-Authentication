let mongoose = require('mongoose');

let gameSchema = mongoose.Schema({
    name: String,
    rating: Number,
    cost: Number
},
{
    collection: "game"
});

module.exports = mongoose.model('games', gameSchema);