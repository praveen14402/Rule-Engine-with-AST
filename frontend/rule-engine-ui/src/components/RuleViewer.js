// RuleViewer.js
import React, { useEffect, useState } from 'react';
import { getRules } from '../services/apiService'; // You'll need to create this function in your apiService.js

const RuleViewer = ({ onSelect }) => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getRules(); // Fetch the rules from the backend
        setRules(response.rules);
      } catch (err) {
        setError(err);
      }
    };

    fetchRules();
  }, []);

  const handleSelect = (ruleId) => {
    onSelect(ruleId);
  };

  return (
    <div>
      <h2>Rules</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {rules.map((rule) => (
          <li key={rule._id}>
            <input
              type="checkbox"
              onChange={() => handleSelect(rule._id)}
            />
            {rule.ruleName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleViewer;
