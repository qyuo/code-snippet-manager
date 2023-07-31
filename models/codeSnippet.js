const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);

module.exports = CodeSnippet;
