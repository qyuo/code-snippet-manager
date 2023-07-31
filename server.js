const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/code_snippet_manager";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

const codeSnippetRoutes = require("./routes/codeSnippetRoutes");
const userRoutes = require("./routes/userRoutes");
const protectRoute = require("./authMiddleware");

app.use("/api/code-snippets", protectRoute, codeSnippetRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
