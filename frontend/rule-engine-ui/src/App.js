// src/App.js

import React, { useState } from 'react';
import RuleCreator from './components/RuleCreator';
import RuleCombiner from './components/RuleCombiner';
import Evaluator from './components/Evaluator';
import { useEffect } from 'react';

const App = () => {
    const [rules, setRules] = useState([]);
    const [combinedAST, setCombinedAST] = useState(null);

    const handleRuleCreated = (newRule) => {
        setRules(prev => [...prev, newRule]);
    };

    return (
        <div>
            <h1>Rule Engine</h1>
            <RuleCreator onRuleCreated={handleRuleCreated} />
            <RuleCombiner rules={rules} setCombinedAST={setCombinedAST} />
            {combinedAST && <Evaluator ast={combinedAST} />}
        </div>
    );
};

export default App;
