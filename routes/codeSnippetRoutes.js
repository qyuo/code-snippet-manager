const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const CodeSnippet = require("../models/codeSnippet.js");
const secretKey = process.env.SECRET_KEY;

// Middleware to verify the token and get the userId
const verifyTokenAndGetUserId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the token from the header
    const decodedToken = jwt.verify(token, secretKey); // decode the token
    req.userId = decodedToken.id; // store the userId in the request object
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Create a new code snippet
router.post("/", verifyTokenAndGetUserId, async (req, res) => {
  try {
    const { title, description, language, code } = req.body;
    const newSnippet = new CodeSnippet({
      title,
      description,
      language,
      code,
      userId: req.userId,
    });
    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(500).json({ error: "Could not create the code snippet." });
  }
});

// Get all code snippets
router.get("/", verifyTokenAndGetUserId, async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({ userId: req.userId }).sort({
      date: -1,
    });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve code snippets." });
  }
});

// Search for code snippets by title, description, or language
router.get("/search", verifyTokenAndGetUserId, async (req, res) => {
  const { q } = req.query;
  const query = {
    userId: req.userId,
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { language: { $regex: q, $options: "i" } },
    ],
  };

  try {
    const snippets = await CodeSnippet.find(query).sort({ date: -1 });
    res.json(snippets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not perform the search." });
  }
});

router.delete("/:id", verifyTokenAndGetUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await CodeSnippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ error: "Code snippet not found." });
    }
    if (snippet.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this snippet." });
    }
    await CodeSnippet.findByIdAndDelete(id);
    res.json({ message: "Code snippet deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete the code snippet." });
  }
});

module.exports = router;
