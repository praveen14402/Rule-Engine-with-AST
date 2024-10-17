// routes/rules.js
const express = require('express');
const router = express.Router();
const {
  createRule,
  combineRules,
  evaluateRule
} = require('../controllers/ruleController');

// Define routes
router.post('/create_rule', createRule);
router.post('/combine_rules', combineRules);
router.post('/evaluate_rule', evaluateRule);

module.exports = router;
