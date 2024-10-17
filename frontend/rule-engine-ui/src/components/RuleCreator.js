// src/components/RuleCreator.js

import React, { useState } from 'react';
import { createRule } from '../services/apiService';

const RuleCreator = ({ onRuleCreated }) => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!ruleName || !ruleString) {
            setError('Both rule name and rule string are required.');
            return;
        }

        const result = await createRule(ruleName, ruleString);
        if (result.error) {
            setError(result.error);
        } else {
            onRuleCreated(result.rule); // Pass the created rule back to the parent
            setRuleName('');
            setRuleString('');
        }
    };

    return (
        <div>
            <h3>Create Rule</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Rule Name"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Rule String"
                    value={ruleString}
                    onChange={(e) => setRuleString(e.target.value)}
                    required
                />
                <button type="submit">Create Rule</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RuleCreator;
