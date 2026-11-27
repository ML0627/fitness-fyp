// Use case: Create Account
// One use case, one controller.
// Boundary: SignUpScreen
// Entity: User
import { User } from '../entity/User';

export type CreateAccountErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type CreateAccountResult =
  | { ok: true; user: User }
  | { ok: false; errors: CreateAccountErrors };

export class CreateAccountController {
  createAccount(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): CreateAccountResult {
    const errors: CreateAccountErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      errors.name = 'Name is required.';
    }

    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    const user = new User(trimmedEmail, trimmedName);
    console.log('Sign-up submit ready for Supabase', {
      name: user.name,
      email: user.email,
    });
    return { ok: true, user };
  }
}
