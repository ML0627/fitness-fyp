// Entity for the Log In and Create Account use cases.
// Holds the account details. The password stays in the controller check
// and is not stored on this object.
export class User {
  email: string;
  name?: string;

  constructor(email: string, name?: string) {
    this.email = email;
    this.name = name;
  }
}
