import { browser, element, by, $, protractor } from 'protractor';

describe('register', () => {

  const registerLink = element(by.id('register'));
  const firstName = element(by.id('givenName'));
  const lastName = element(by.id('surname'));
  const email = element(by.id('email'));
  const password = element(by.id('password'));
  const logout = element(by.id('logout'));
  const title = element.all(by.css('h1')).first();

  beforeEach(() => {
    browser.get('');
    registerLink.click();
    expect(firstName.isDisplayed());
  });

  afterAll(() => {
    // delete user via the REST API
  });

  it('should fail with short password', () => {
    firstName.sendKeys('Test');
    lastName.sendKeys('User');
    email.sendKeys('matt.raible+user' + getRandomInt(0, 1000) + '@stormpath.com');
    password.sendKeys('short');
    element(by.css('button[type=submit]')).click();

    let error = $('.alert-danger').getText();
    expect(error).toMatch(/Account password minimum length not satisfied./);
  });

  it('should register successfully', () => {
    firstName.sendKeys('Test');
    lastName.sendKeys('User');
    email.sendKeys('matt.raible+user' + getRandomInt(0, 1000) + '@stormpath.com');
    password.sendKeys('Stormpath123');
    element(by.css('button[type=submit]')).click();

    let success = $('.alert-success').getText();
    expect(success).toMatch(/Your account has been created, you may now log in./);

    browser.sleep(2000);
    expect(title.getText()).toMatch(/Welcome, Test User/);

    logout.click();

    expect(title.getText()).toMatch(/Hello/);
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
