const mongoose = require("mongoose");

const Schema = mongoose.Schema ;

let TodoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    is_done: { type: Boolean }
});

module.exports = mongoose.model("todo", TodoSchema);