// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  caseID: { type: String, required: true },
  victimName: { type: String, required: true },
  caseType: { type: String, required: true },
  caseDescription: { type: String, required: true },
  fileUpload: { type: String, required: true }, // You may need to adjust the type based on your requirements
  suspectName: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
