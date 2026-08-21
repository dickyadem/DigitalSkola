const assert = require("node:assert");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

describe("Belajar Bareng Login", function () {
  this.timeout(20000);

  let driver;

  before(async function () {
    const options = new chrome.Options().addArguments(
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
        "--disable-background-networking",   
    "--disable-component-update",        
    "--disable-sync",                   
    "--no-first-run",                    
    "--disable-default-apps",            
    "--disable-extensions",              
    "--disable-notifications",           
    "--log-level=3",                     
    "--silent"                          
    );

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  beforeEach(async function () {
    await driver.get("https://belajar-bareng.onrender.com/");

    const usernameInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="username-input"]')),
      10000,
    );
    const passwordInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="password-input"]')),
      10000,
    );
    const loginButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-button"]')),
      10000,
    );

    await usernameInput.sendKeys("admin");
    await passwordInput.sendKeys("admin");
    await loginButton.click();
  });

  afterEach(async function () {
    await driver.manage().deleteAllCookies();
    await driver.executeScript(
      "window.localStorage.clear(); window.sessionStorage.clear();",
    );
  });

  after(async function () {
    await driver.quit();
  });

  it("should login and add a new user", async function () {
    const uniqueUsername = `user${Date.now().toString().slice(-6)}`;
    const uniqueAge = `${20 + (Date.now() % 50)}`;

    const addButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-button"]')),
      10000,
    );
    assert.strictEqual(await addButton.isDisplayed(), true);
    await addButton.click();

    const addUsernameInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="username-input"]')),
      10000,
    );
    const ageInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="age-input"]')),
      10000,
    );
    const submitButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="submit-button"]')),
      10000,
    );
    assert.strictEqual(await submitButton.isDisplayed(), true);

    await addUsernameInput.clear();
    await addUsernameInput.sendKeys(uniqueUsername);
    await ageInput.clear();
    await ageInput.sendKeys(uniqueAge);

    await submitButton.click();

    await driver.wait(async () => {
      const currentUsername = await addUsernameInput.getAttribute("value");
      const currentAge = await ageInput.getAttribute("value");
      return currentUsername === "" && currentAge === "";
    }, 10000);

    assert.strictEqual(await addUsernameInput.getAttribute("value"), "");
    assert.strictEqual(await ageInput.getAttribute("value"), "");
  });
});
