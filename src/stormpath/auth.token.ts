/**
 * Class to represent a Stormpath Authentication Token.
 */
export class AuthToken {

  constructor(public accessToken: string, public refreshToken: string, public tokenType: string,
              public expiresIn: number, public expiresAt: number) {}

}
