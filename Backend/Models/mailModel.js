const mongoose = require("mongoose");

const mailSchema = mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  cc: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  scheduledFor: {
    type: String,
  },
  scheduledAt: {
    type: Date,
  },
});

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
