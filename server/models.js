const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: String,
  creator: String
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
