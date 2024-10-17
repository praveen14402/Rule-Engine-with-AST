  // controllers/ruleController.js
  const Rule = require('../models/rule');
  const Node = require('../models/ast');

// Helper function to parse a rule string into an AST// Placeholder function for parsing a rule string into an AST
function parseRuleString(ruleString) {
    // Example parsing logic (this should be replaced with actual parsing)
    const operatorNode = new Node("operator", null, null, "AND");
    const leftNode = new Node("operand", null, null, { key: "age", operator: ">", value: 30 });
    const rightNode = new Node("operand", null, null, { key: "department", operator: "=", value: "Sales" });
  
    operatorNode.left = leftNode;
    operatorNode.right = rightNode;
  
    return operatorNode;
  }





// Create Rule - Parse the rule string and store the AST in the database
exports.createRule = async (req, res) => {
  const { ruleString, ruleName } = req.body;
  if (!ruleString || !ruleName) {
    return res.status(400).json({ error: "Rule name and rule string are required" });
  }

  try {
    const ast = parseRuleString(ruleString);
    const newRule = new Rule({ ruleName, ast });
    await newRule.save();

    res.status(201).json({ message: "Rule created successfully", rule: newRule });
  } catch (error) {
    res.status(500).json({ error: "Failed to create rule" });
  }
};

// Combine Rules - Combines multiple rules into a single AST
exports.combineRules = async (req, res) => {
  const { ruleIds } = req.body;
  if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length < 2) {
    return res.status(400).json({ error: "At least two rule IDs are required" });
  }

  try {
    // Fetch the rules from the database
    const rulesToCombine = await Rule.find({ _id: { $in: ruleIds } });
    if (rulesToCombine.length < 2) {
      return res.status(404).json({ error: "Not enough rules found to combine" });
    }

    // Create a combined AST using OR logic
    const combinedNode = new Node("operator", null, null, "OR");
    combinedNode.left = rulesToCombine[0].ast;
    combinedNode.right = rulesToCombine[1].ast;

    res.status(200).json({ message: "Rules combined successfully", combinedAST: combinedNode });
  } catch (error) {
    res.status(500).json({ error: "Failed to combine rules" });
  }
};

// Evaluate Rule - Evaluates the rule against given data
exports.evaluateRule = (req, res) => {
  const { ast, data } = req.body;
  if (!ast || !data) {
    return res.status(400).json({ error: "AST and data are required" });
  }

  try {
    const evaluateNode = (node, data) => {
      if (node.type === "operand") {
        const { key, operator, value } = node.value;
        switch (operator) {
          case ">":
            return data[key] > value;
          case "<":
            return data[key] < value;
          case "=":
            return data[key] === value;
          default:
            return false;
        }
      } else if (node.type === "operator") {
        const leftResult = evaluateNode(node.left, data);
        const rightResult = evaluateNode(node.right, data);
        if (node.value === "AND") {
          return leftResult && rightResult;
        } else if (node.value === "OR") {
          return leftResult || rightResult;
        }
      }
      return false;
    };

    const result = evaluateNode(ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to evaluate rule" });
  }
};

// Create Rule - Parse the rule string and store the AST in the database
exports.createRule = async (req, res) => {
const { ruleString, ruleName } = req.body;
if (!ruleString || !ruleName) {
 return res.status(400).json({ error: "Rule name and rule string are required" });
}

try {
 const ast = parseRuleString(ruleString);
 const newRule = new Rule({ ruleName, ast });
 await newRule.save();

 res.status(200).json({ message: "Rule created successfully", rule: newRule });
} catch (error) {
 res.status(500).json({ error: "Failed to create rule" });
}
};

// Combine Rules - Combines multiple rules into a single AST
exports.combineRules = async (req, res) => {
const { ruleIds } = req.body;
if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length < 2) {
 return res.status(400).json({ error: "At least two rule IDs are required" });
}

try {
 // Fetch the rules from the database
 const rulesToCombine = await Rule.find({ _id: { $in: ruleIds } });
 if (rulesToCombine.length < 2) {
   return res.status(404).json({ error: "Not enough rules found to combine" });
 }

 // Create a combined AST using OR logic
 const combinedNode = new Node("operator", null, null, "OR");
 combinedNode.left = rulesToCombine[0].ast;
 combinedNode.right = rulesToCombine[1].ast;

 res.status(200).json({ message: "Rules combined successfully", combinedAST: combinedNode });
} catch (error) {
 res.status(500).json({ error: "Failed to combine rules" });
}
};

// Evaluate Rule - Evaluates the rule against given data
exports.evaluateRule = (req, res) => {
const { ast, data } = req.body;
if (!ast || !data) {
 return res.status(400).json({ error: "AST and data are required" });
}

try {
 const evaluateNode = (node, data) => {
   if (node.type === "operand") {
     const { key, operator, value } = node.value;
     switch (operator) {
       case ">":
         return data[key] > value;
       case "<":
         return data[key] < value;
       case "=":
         return data[key] === value;
       default:
         return false;
     }
   } else if (node.type === "operator") {
     const leftResult = evaluateNode(node.left, data);
     const rightResult = evaluateNode(node.right, data);
     if (node.value === "AND") {
       return leftResult && rightResult;
     } else if (node.value === "OR") {
       return leftResult || rightResult;
     }
   }
   return false;
 };

 const result = evaluateNode(ast, data);
 res.status(200).json({ result });
} catch (error) {
 res.status(500).json({ error: "Failed to evaluate rule" });
}
};
