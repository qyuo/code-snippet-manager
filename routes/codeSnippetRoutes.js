const express = require("express");
const router = express.Router();
const CodeSnippet = require("../models/codeSnippet.js");

// Create a new code snippet
router.post("/", async (req, res) => {
  try {
    const { title, description, language, code } = req.body;
    const newSnippet = new CodeSnippet({ title, description, language, code });
    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(500).json({ error: "Could not create the code snippet." });
  }
});

// Get all code snippets
router.get("/", async (req, res) => {
  try {
    const snippets = await CodeSnippet.find();
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve code snippets." });
  }
});

// Search for code snippets by title, description, or language
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const query = {
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { language: { $regex: q, $options: "i" } },
    ],
  };

  try {
    const snippets = await CodeSnippet.find(query);
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: "Could not perform the search." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSnippet = await CodeSnippet.findByIdAndDelete(id);
    if (!deletedSnippet) {
      return res.status(404).json({ error: "Code snippet not found." });
    }
    res.json({ message: "Code snippet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete the code snippet." });
  }
});

module.exports = router;
