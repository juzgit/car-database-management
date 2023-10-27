const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//the car schema
const carSchema = new Schema({
    make: String,
    model: String,
    registrationNumber: String,
    currentOwner: String,
    manufacturingYear: Number
});

module.exports = mongoose.model('Car', carSchema);