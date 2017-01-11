/**
 * Class to represent a Stormpath Authentication Token.
 */
export class AuthToken {

  static isValid(token: AuthToken): boolean {
    return token && new Date() <= new Date(token.exp);
  }

  constructor(public accessToken: string, public refreshToken: string, public tokenType: string,
              public expiresIn: number, public expiresAt: number, public exp: Date) {}
}
