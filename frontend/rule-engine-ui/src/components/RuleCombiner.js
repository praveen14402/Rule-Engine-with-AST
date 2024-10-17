// src/components/RuleCombiner.js

import React, { useState } from 'react';
import { combineRules } from '../services/apiService';

const RuleCombiner = ({ rules }) => {
    const [selectedRuleIds, setSelectedRuleIds] = useState([]);
    const [combinedAST, setCombinedAST] = useState(null);
    const [error, setError] = useState('');

    const handleCombine = async () => {
        if (selectedRuleIds.length < 2) {
            setError('Select at least two rules to combine.');
            return;
        }
        
        const result = await combineRules(selectedRuleIds);
        if (result.error) {
            setError(result.error);
        } else {
            setCombinedAST(result.combinedAST);
            setError('');
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedRuleIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div>
            <h3>Combine Rules</h3>
            {rules.map(rule => (
                <div key={rule._id}>
                    <input
                        type="checkbox"
                        value={rule._id}
                        onChange={() => handleCheckboxChange(rule._id)}
                    />
                    {rule.ruleName}
                </div>
            ))}
            <button onClick={handleCombine}>Combine Selected Rules</button>
            {combinedAST && <pre>{JSON.stringify(combinedAST, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RuleCombiner;
