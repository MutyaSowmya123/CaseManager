const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Case = require("./models/Case"); // Import the Case model

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// MongoDB connection setup
mongoose.connect(
  "mongodb+srv://sowmyamutya20:H4kRC6acSE6N2l32@cluster0.psr1kne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database successfully!");
});

// Route to insert a new user
app.post("/api/users", async (req, res) => {
  const { caseID, victimName, caseType, caseDescription, fileUpload, suspectName } =
    req.body;
  try {
    const user = new User({
      caseID,
      victimName,
      caseType,
      caseDescription,
      fileUpload,
      suspectName,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to insert user" });
  }
});

// Route to delete a user by caseID
app.delete("/api/users/:caseID", async (req, res) => {
  const { caseID } = req.params;
  try {
    const result = await User.deleteOne({ caseID });
    res.json(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Add a new case
// Add a new case
app.post("/api/cases", async (req, res) => {
  const { caseID, victimName, caseType, caseDescription, fileUpload, suspectName } =
    req.body;
  try {
    // Create a new case record
    const newCase = new Case({
      caseID,
      victimName,
      caseType,
      caseDescription,
      fileUpload,
      suspectName,
    });
    // Save the new case record to the database
    await newCase.save();
    res.status(201).json(newCase); // Respond with the created case
  } catch (error) {
    console.error("Error adding case:", error);
    res.status(500).json({ error: "Failed to add case" });
  }
});

// Search for cases
app.get("/api/search", async (req, res) => {
  const { query } = req.query;
  try {
    // Implement your search logic here based on the query
    // For example:
    const cases = await Case.find({ caseID: query }); // Search for cases with the specified caseID
    res.json(cases);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Failed to search cases" });
  }
});

// Route to update a user by caseID
app.put("/api/users/:caseID", async (req, res) => {
  const { caseID } = req.params;
  const newData = req.body;
  try {
    const result = await User.updateOne({ caseID }, newData);
    res.json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Route to fetch all cases
app.get("/api/cases", async (req, res) => {
  try {
    // Fetch all cases from the database
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
