const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
});

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);

module.exports = CodeSnippet;
