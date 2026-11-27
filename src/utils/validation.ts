export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getPasswordError(password: string): string | null {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return null;
}

export type LoginErrors = {
  email?: string;
  password?: string;
};

export type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const passwordError = getPasswordError(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateSignUp(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const passwordError = getPasswordError(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
