const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    balance: {
        type: Number,
        default: 0
    },
    holdings: [{
        name: { type: String },
        qty: { type: Number },
        avg: { type: Number },
        price: { type: Number },
        net: { type: String },
        day: { type: String },
    }], // Embedded documents
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Referenced
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;