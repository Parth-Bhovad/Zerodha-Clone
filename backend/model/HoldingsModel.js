const mongoose = require('mongoose');
const { Schema } = mongoose;

const HoldingsSchema = new Schema({
    name: { type: String },
    qty: { type: Number },
    avg: { type: Number },
    price: { type: Number },
    net: { type: String },
    day: { type: String },
});
const HoldingsModel = mongoose.model('Holdings', HoldingsSchema);

module.exports = HoldingsModel;