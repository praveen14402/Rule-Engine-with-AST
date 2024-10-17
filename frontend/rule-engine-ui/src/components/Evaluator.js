// src/components/Evaluator.js

import React, { useState } from 'react';
import { evaluateRule } from '../services/apiService';

const Evaluator = ({ ast }) => {
    const [userData, setUserData] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleEvaluate = async () => {
        if (!ast || Object.keys(userData).length === 0) {
            setError('Both AST and user data are required.');
            return;
        }
        
        const evaluationResult = await evaluateRule(ast, userData);
        if (evaluationResult.error) {
            setError(evaluationResult.error);
        } else {
            setResult(evaluationResult.result);
            setError('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h3>Evaluate Rule</h3>
            <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
            />
            <input
                type="text"
                name="department"
                placeholder="Department"
                onChange={handleChange}
            />
            <input
                type="number"
                name="salary"
                placeholder="Salary"
                onChange={handleChange}
            />
            <input
                type="number"
                name="experience"
                placeholder="Experience"
                onChange={handleChange}
            />
            <button onClick={handleEvaluate}>Evaluate</button>
            {result !== null && <p>Result: {result.toString()}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Evaluator;
