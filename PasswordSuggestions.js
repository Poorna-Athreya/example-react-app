// src/components/PasswordSuggestions.js

import React from 'react';
import styles from '../styles/PasswordSuggestions.module.css';

const PasswordSuggestions = ({ suggestions }) => {
  return (
    <div className={styles.suggestionsContainer}>
      <h4>Password Suggestions</h4>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

PasswordSuggestions.defaultProps = {
  suggestions: [
    'Include at least one uppercase letter',
    'Include at least one number',
    'Include at least one special character',
    'Make your password at least 8 characters long',
  ],
};

export default PasswordSuggestions;
