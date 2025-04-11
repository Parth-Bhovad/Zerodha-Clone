const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    name: { type: String },
    qty: { type: Number },
    price: { type: Number },
    mode: { type: String },
});

const OrdersModel = mongoose.model('Orders', OrdersSchema);
module.exports = OrdersModel;