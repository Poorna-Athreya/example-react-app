/**
 * A utility function to calculate the strength of a given password based on predefined criteria 
 * and returns a strength value ('Weak', 'Medium', 'Strong').
 * 
 * Strength Criteria:
 * Weak: Less than 8 characters.
 * Medium: At least 8 characters and must include a mix of letters (uppercase and lowercase) and numbers.
 * Strong: At least 12 characters and must include a mix of letters (uppercase and lowercase), numbers, and special characters.
*/

const calculatePasswordStrength = (password) => {
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }

  const strengthCriteria = {
    'Weak': /(?=.{1,7}$)/,
    'Medium': /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,11}$)/,
    'Strong': /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?=.{12,}$)/
  };

  if (strengthCriteria['Strong'].test(password)) {
    return 'Strong';
  }

  if (strengthCriteria['Medium'].test(password)) {
    return 'Medium';
  }

  return 'Weak';
};

export default calculatePasswordStrength;
