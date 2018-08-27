const mongoose = require('mongoose');


const mlways = new mongoose.Schema({
    _id: Number,
    startWaypointID: Number,
    endWaypointID: Number,
    distant: Number,
    time: Number,
    ratio : Number
},{ timestamps: true});

module.exports = mongoose.model('mlways',mlways);