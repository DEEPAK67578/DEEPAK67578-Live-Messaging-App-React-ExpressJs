const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = model("message", messageSchema);
