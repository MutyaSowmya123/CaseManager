// Case.js

const mongoose = require('mongoose');

// Define the schema for the Case model
const caseSchema = new mongoose.Schema({
  caseID: {
    type: String,
    required: true
  },
  victimName: {
    type: String,
    required: true
  },
  caseType: {
    type: String,
    required: true
  },
  caseDescription: {
    type: String,
    required: true
  },
  fileUpload: {
    type: String,
    required: true
  },
  suspectName: {
    type: String,
    required: true
  }
});

// Create the Case model using the schema
const Case = mongoose.model('Case', caseSchema);

// Export the Case model
module.exports = Case;
