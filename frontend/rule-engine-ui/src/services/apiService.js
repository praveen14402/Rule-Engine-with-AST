// src/apiService.js

const API_BASE_URL = 'http://localhost:5000/api'; // Update this based on your backend URL

export const createRule = async (ruleName, ruleString) => {
    const response = await fetch(`${API_BASE_URL}/create_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleName, ruleString }),
    });
    return response.json();
};

export const combineRules = async (ruleIds) => {
    const response = await fetch(`${API_BASE_URL}/combine_rules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleIds }),
    });
    return response.json();
};

export const evaluateRule = async (ast, data) => {
    const response = await fetch(`${API_BASE_URL}/evaluate_rule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast, data }),
    });
    return response.json();
};
