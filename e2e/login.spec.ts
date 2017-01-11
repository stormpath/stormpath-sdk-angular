import { browser, element, by, $ } from 'protractor';

describe('login', () => {

  const username = element(by.id('loginField'));
  const password = element(by.id('passwordField'));
  const logout = element(by.id('logout'));
  const title = element.all(by.css('h1')).first();

  beforeAll(() => {
    browser.get('');
  });

  it('should fail to login with bad password', () => {
    expect(element.all(by.css('h1')).first().getText()).toMatch(/Hello/);

    username.sendKeys('admin');
    password.sendKeys('foo');
    element(by.css('button[type=submit]')).click();

    let error = $('.alert-danger').getText();
    expect(error).toMatch(/Invalid username or password./);
  });

  it('should login successfully with valid account', () => {
    expect(title.getText()).toMatch(/Hello/);

    username.clear();
    username.sendKeys('matt.raible+user@stormpath.com');
    password.clear();
    password.sendKeys('Stormpath1');
    element(by.css('button[type=submit]')).click();

    // sleep for 1 second because client API takes a smidge longer
    browser.sleep(1000);
    expect(title.getText()).toMatch(/Welcome, Hip User/);

    logout.click();

    expect(title.getText()).toMatch(/Hello/);
  });
});
