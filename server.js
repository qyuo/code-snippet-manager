const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
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

// Define your routes here
const codeSnippetRoutes = require("./routes/codeSnippetRoutes");
app.use("/api/code-snippets", codeSnippetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
