/**
 * This interface represents the known base properties of a Stormpath Account
 * object, that you will receive from the /me endpoint on your server. The
 * object can have more properties, depending on the `expand` options that are
 * configured in the server.
 */
export interface BaseStormpathAccount {

  href: string;
  username: string;
  email: string;
  givenName: string;
  middleName: string;
  surname: string;
  fullName: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  passwordModifiedAt: string;
  [propName: string]: any;
}

export class Account {

  status: string;

  constructor(account: BaseStormpathAccount) {
    for (let property in account) {
      this[property] = account[property];
    }
  }
}

