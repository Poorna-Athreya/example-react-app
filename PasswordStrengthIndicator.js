import React, { useState } from 'react';
import styles from '../styles/PasswordStrengthIndicator.module.css';
import { calculatePasswordStrength } from '../utils/calculatePasswordStrength';
import PasswordSuggestions from './PasswordSuggestions';

const PasswordStrengthIndicator = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(''); 

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strengthValue = calculatePasswordStrength(newPassword);
    setStrength(strengthValue);
  };

  return (
    <div className={styles.passwordStrengthIndicator}>
      <label htmlFor="password" className={styles.passwordLabel}>
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className={styles.passwordInput}
      />
      <div className={styles.strengthDisplay}>
        Strength: <span className={styles[strength.toLowerCase()]}>{strength}</span>
      </div>
      <PasswordSuggestions password={password} />
    </div>
  );
};

export default PasswordStrengthIndicator;
