const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true },
  ast: { type: Object, required: true }, // Store the AST structure
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rule', RuleSchema);
