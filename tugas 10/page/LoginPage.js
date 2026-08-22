const { By, until } = require("selenium-webdriver");
const { LoginPageLocator, UrlLocator } = require("../locator/LoginPage.locator");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(UrlLocator.loginPage);
  }

  async login(username, password = "secret_sauce") {
    await this.driver.wait(until.elementLocated(By.css(LoginPageLocator.usernameInput)), 10000);
    await this.driver.findElement(By.css(LoginPageLocator.usernameInput)).sendKeys(username);
    await this.driver.findElement(By.css(LoginPageLocator.passwordInput)).sendKeys(password);
    await this.driver.findElement(By.css(LoginPageLocator.loginButton)).click();
  }

  async waitForError() {
    return this.driver.wait(
      until.elementLocated(By.css(LoginPageLocator.errorMessage)),
      10000,
    );
  }

  async waitForInventory() {
    return this.driver.wait(until.elementLocated(By.css(LoginPageLocator.inventory)), 15000);
  }
}

module.exports = LoginPage;
