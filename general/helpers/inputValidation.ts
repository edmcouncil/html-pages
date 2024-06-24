export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export const validateField = (
  value: string,
  rules: ValidationRule[]
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};

export const emailRules: ValidationRule[] = [
  {
    validate: (value) => !!value,
    message: 'Email is required'
  },
  {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email format'
  }
];

export const usernameRules: ValidationRule[] = [
  {
    validate: (value) => !!value,
    message: 'Username is required'
  },
  {
    validate: (value) => value.length >= 3,
    message: 'Username must be at least 3 characters'
  }
];

export const passwordRules: ValidationRule[] = [
  {
    validate: (value) => !!value,
    message: 'Password is required'
  },
  {
    validate: (value) => value.length >= 6,
    message: 'Password must be at least 6 characters'
  }
];
