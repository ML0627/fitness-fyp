// Use case: Log In
// One use case, one controller.
// Boundary: LoginScreen
// Entity: User
import { User } from '../entity/User';

export type LoginErrors = {
  email?: string;
  password?: string;
};

export type LoginResult =
  | { ok: true; user: User }
  | { ok: false; errors: LoginErrors };

export class LoginController {
  login(email: string, password: string): LoginResult {
    const errors: LoginErrors = {};
    const trimmedEmail = email.trim();

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

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    const user = new User(trimmedEmail);
    console.log('Login submit ready for Supabase', { email: user.email });
    return { ok: true, user };
  }
}
